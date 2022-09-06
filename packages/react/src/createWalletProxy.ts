import type { WalletName } from '@web3-wallet/core';
import { useMemo } from 'react';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import type { Wallet, WalletProxy, WalletProxyState } from './types';

export const createWalletProxy = (
  wallets: Wallet[],
  options: {
    defaultCurrentWallet?: WalletName;
    key?: string;
  } = {},
): WalletProxy => {
  const { defaultCurrentWallet: defaultCurrentWallet, key = '@web3-wallet' } =
    options;

  if (!wallets.length) throw new Error(`wallets can't be empty`);

  const useStore = create<WalletProxyState>()(
    persist(
      () =>
        ({
          connectionId: undefined,
          currentWallet: defaultCurrentWallet || wallets[0].name,
        } as WalletProxyState),
      {
        name: key,
        version: 0,
      },
    ),
  );

  const useCurrentWallet: WalletProxy['useCurrentWallet'] = () => {
    const currentWalletName = useStore((s) => s.currentWallet);
    return useMemo(
      () => wallets.find((w) => w.name === currentWalletName) as Wallet,
      [currentWalletName],
    );
  };

  const setCurrentWallet: WalletProxy['setCurrentWallet'] = (
    currentWallet: WalletName,
  ): void => {
    useStore.setState({
      currentWallet,
    });
  };

  const useConnectionId: WalletProxy['useConnectionId'] = () => {
    return useStore((s) => s.connectionId);
  };

  const getCombineHooks = (): Wallet['hooks'] => {
    /**
     * combine hooks
     *
     * If we don't combine the hooks, the hooks will be called base on
     * currentWalletName, which violates the react hook rules.
     *
     * Combine hooks to always call all the hooks in consistent order
     *  so that we don't violates the react hook rules:
     *
     * https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level
     */
    const combinedHooks: Record<string, unknown> = {};

    for (const hookName of Object.keys(wallets[0].hooks).sort()) {
      combinedHooks[hookName] = (...args: unknown[]) => {
        let hookFnOutput: unknown;
        const currentWalletName = useStore.getState().currentWallet;

        for (const wallet of wallets) {
          const hookFn = wallet.hooks[hookName as keyof Wallet['hooks']] as (
            ...args: unknown[]
          ) => unknown;

          const value = hookFn(...args);

          if (wallet.name === currentWalletName) {
            hookFnOutput = value;
          }
        }

        return hookFnOutput;
      };
    }

    return combinedHooks as Wallet['hooks'];
  };

  const useConnect: WalletProxy['useConnect'] = () => {
    const wallet = useCurrentWallet();

    const connect: Wallet['connector']['connect'] = async (...args) => {
      await wallet.connector.connect(...args);
      useStore.setState({ connectionId: Date.now() });
    };

    return connect;
  };

  const useAutoConnect: WalletProxy['useAutoConnect'] = () => {
    const wallet = useCurrentWallet();
    const autoConnect: Wallet['connector']['autoConnect'] = async (...args) => {
      const result = await wallet.connector.autoConnect(...args);
      useStore.setState({ connectionId: Date.now() });
      return result;
    };
    return autoConnect;
  };

  const useAutoConnectOnce: WalletProxy['useAutoConnectOnce'] = () => {
    const wallet = useCurrentWallet();
    const autoConnectOnce: Wallet['connector']['autoConnectOnce'] = async (
      ...args
    ) => {
      const connectionId = useStore.getState().connectionId;

      if (!connectionId) {
        console.debug(`connectionId don't exists, auto connect is suppressed`);
        return false;
      }

      return await wallet.connector.autoConnectOnce(...args);
    };
    return autoConnectOnce;
  };

  const useDisconnect: WalletProxy['useDisconnect'] = () => {
    const wallet = useCurrentWallet();

    const disconnect: Wallet['connector']['disconnect'] = async (...args) => {
      const result = await wallet.connector.disconnect(...args);
      useStore.setState({ connectionId: undefined });
      return result;
    };

    return disconnect;
  };

  return {
    ...getCombineHooks(),
    wallets,
    useCurrentWallet,
    setCurrentWallet,
    useConnectionId,
    useConnect,
    useAutoConnect,
    useAutoConnectOnce,
    useDisconnect,
  };
};
