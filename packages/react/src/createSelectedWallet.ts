import type { WalletName } from '@web3-wallet/core';
import { useMemo } from 'react';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import type { SelectedWallet, Wallet } from './types';

type SelectedWalletState = {
  selectedWallet?: WalletName;
  connectionId?: number;
};

export const createSelectedWallet = (
  wallets: Wallet[],
  options: {
    defaultSelectedWallet?: WalletName;
    key?: string;
  } = {},
): SelectedWallet => {
  const { defaultSelectedWallet, key = '@web3-wallet' } = options;

  if (!wallets.length) throw new Error(`wallets can't be empty`);

  const useStore = create<SelectedWalletState>()(
    persist(
      () =>
        ({
          connectionId: undefined,
          selectedWallet: defaultSelectedWallet || wallets[0].name,
        } as SelectedWalletState),
      {
        name: key,
        version: 0,
      },
    ),
  );

  const useSelectedWallet: SelectedWallet['useSelectedWallet'] = () => {
    const selectedWalletName = useStore((s) => s.selectedWallet);
    return useMemo(
      () => wallets.find((w) => w.name === selectedWalletName) as Wallet,
      [selectedWalletName],
    );
  };

  const setSelectedWallet: SelectedWallet['setSelectedWallet'] = (
    selectedWallet: WalletName,
  ): void => {
    useStore.setState({
      selectedWallet,
    });
  };

  const useConnectionId: SelectedWallet['useConnectionId'] = () => {
    return useStore((s) => s.connectionId);
  };

  const getCombineHooks = (): Wallet['hooks'] => {
    /**
     * combine hooks
     *
     * If we don't combine the hooks, the hooks will be called base on
     * selectedWalletName, which violates the react hook rules.
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
        const selectedWalletName = useStore.getState().selectedWallet;

        for (const wallet of wallets) {
          const hookFn = wallet.hooks[hookName as keyof Wallet['hooks']] as (
            ...args: unknown[]
          ) => unknown;

          const value = hookFn(...args);

          if (wallet.name === selectedWalletName) {
            hookFnOutput = value;
          }
        }

        return hookFnOutput;
      };
    }

    return combinedHooks as Wallet['hooks'];
  };

  const useConnect: SelectedWallet['useConnect'] = () => {
    const wallet = useSelectedWallet();

    const connect: Wallet['connector']['connect'] = async (...args) => {
      await wallet.connector.connect(...args);
      useStore.setState({ connectionId: Date.now() });
    };

    return connect;
  };

  const useAutoConnect: SelectedWallet['useAutoConnect'] = () => {
    const wallet = useSelectedWallet();
    const autoConnect: Wallet['connector']['autoConnect'] = async (...args) => {
      const result = await wallet.connector.autoConnect(...args);
      useStore.setState({ connectionId: Date.now() });
      return result;
    };
    return autoConnect;
  };

  const useAutoConnectOnce: SelectedWallet['useAutoConnectOnce'] = () => {
    const wallet = useSelectedWallet();
    const autoConnect: Wallet['connector']['autoConnectOnce'] = async (
      ...args
    ) => {
      const result = await wallet.connector.autoConnectOnce(...args);
      useStore.setState({ connectionId: Date.now() });
      return result;
    };
    return autoConnect;
  };

  const useDisconnect: SelectedWallet['useDisconnect'] = () => {
    const wallet = useSelectedWallet();

    const disconnect: Wallet['connector']['disconnect'] = async (...args) => {
      const result = await wallet.connector.disconnect(...args);
      useStore.setState({ connectionId: undefined });
      return result;
    };

    return disconnect;
  };

  return {
    ...getCombineHooks(),
    useSelectedWallet: useSelectedWallet,
    setSelectedWallet,
    useConnectionId: useConnectionId,
    useConnect,
    useAutoConnect: useAutoConnect,
    useAutoConnectOnce,
    useDisconnect,
  };
};
