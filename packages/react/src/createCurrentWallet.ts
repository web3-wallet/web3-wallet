import type { WalletName } from '@web3-wallet/core';
import { useMemo } from 'react';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import type {
  CurrentWallet,
  CurrentWalletState,
  Wallet,
  WalletCoreHooks,
} from './types';
import { ConnectionStatus } from './types';

export type CreateCurrentWalletOptions = {
  defaultCurrentWallet?: WalletName;
  persistKey?: string;
};

/**
 * @param wallets - The wallets to proxy with
 * @param options - The options object
 * @param options.defaultCurrentWallet - the optional defaultCurrentWallet, default to the first wallets[0].name
 * @param options.persistKey - the optional persist key, default to "@web3-wallet"
 *   if you are creating multiple CurrentWallet, you must provide a stable and unique key to avoid
 *   the persist key clash.
 * @returns CurrentWallet - the crate wallet proxy api
 */
export const createCurrentWallet = (
  wallets: Wallet[],
  options: {
    defaultCurrentWallet?: WalletName;
    persistKey?: string;
  } = {},
): CurrentWallet => {
  const { defaultCurrentWallet, persistKey = '@web3-wallet' } = options;

  if (!wallets.length) throw new Error(`wallets can't be empty`);

  const DEFAULT_STATE: CurrentWalletState = {
    connectionStatus: ConnectionStatus.Untouched,
    currentWallet: defaultCurrentWallet || wallets[0].name,
  };

  const store = create<CurrentWalletState>()(
    persist<CurrentWalletState>(() => DEFAULT_STATE, {
      name: persistKey,
      version: 0,
    }),
  );

  const useName: CurrentWallet['useName'] = () => store((s) => s.currentWallet);

  const switchCurrentWallet: CurrentWallet['switchCurrentWallet'] = (
    currentWallet: WalletName,
  ): void => {
    if (wallets.find((w) => w.name === currentWallet)) {
      store.setState({
        currentWallet,
      });
    } else {
      console.debug(`Wallet '${currentWallet}' don't exists`);
    }
  };

  const getUnderliningCurrentWallet = (): Wallet => {
    const currentWalletName = store.getState().currentWallet;
    const found = wallets.find((w) => w.name === currentWalletName);
    return found ?? wallets[0];
  };

  const useUnderliningCurrentWallet = (): Wallet => {
    const name = useName();
    return useMemo(() => {
      // refresh useCurrentWallet when wallet name changed
      void name;
      return getUnderliningCurrentWallet();
    }, [name]);
  };

  const useConnectionStatus: CurrentWallet['useConnectionStatus'] = () => {
    return store((s) => s.connectionStatus);
  };

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
  const getCombinedHooks = (): WalletCoreHooks => {
    const combinedHooks: Record<string, unknown> = {};

    const {
      useChainId,
      useAccount,
      useAccounts,
      useENSName,
      useENSNames,
      useIsConnected,
      useIsConnecting,
      useProvider,
    } = wallets[0];

    const hooks: WalletCoreHooks = {
      useChainId,
      useAccount,
      useAccounts,
      useENSName,
      useENSNames,
      useIsConnected,
      useIsConnecting,
      useProvider,
    };

    for (const hookName of Object.keys(hooks)) {
      combinedHooks[hookName] = (...args: unknown[]) => {
        let hookFnOutput: unknown;
        const currentWalletName = store.getState().currentWallet;

        for (const wallet of wallets) {
          const hookFn = wallet[hookName as keyof WalletCoreHooks] as (
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

    return combinedHooks as WalletCoreHooks;
  };

  const connect: Wallet['connect'] = async (...args) => {
    const wallet = getUnderliningCurrentWallet();

    const result = await wallet.connect(...args);

    store.setState({
      connectionStatus: ConnectionStatus.Connected,
    });

    return result;
  };

  const autoConnect: Wallet['autoConnect'] = async (...args) => {
    const wallet = getUnderliningCurrentWallet();
    const result = await wallet.autoConnect(...args);

    if (store.getState().connectionStatus === ConnectionStatus.Disconnected) {
      console.debug(`connectionId don't exists, auto connect is suppressed`);
      return false;
    }

    store.setState({
      connectionStatus: ConnectionStatus.Connected,
    });
    return result;
  };

  const autoConnectOnce: Wallet['autoConnectOnce'] = async (...args) => {
    const wallet = getUnderliningCurrentWallet();

    if (store.getState().connectionStatus === ConnectionStatus.Disconnected) {
      console.debug(`connectionId don't exists, auto connect is suppressed`);
      return false;
    }

    const result = await wallet.autoConnectOnce(...args);

    store.setState({
      connectionStatus: ConnectionStatus.Connected,
    });

    return result;
  };

  const disconnect: Wallet['disconnect'] = async (...args) => {
    const wallet = getUnderliningCurrentWallet();
    const result = await wallet.disconnect(...args);
    store.setState({
      connectionStatus: ConnectionStatus.Disconnected,
    });
    return result;
  };

  const getPlugin: CurrentWallet['getPlugin'] = (...args) => {
    return getUnderliningCurrentWallet().getPlugin(...args);
  };

  const usePlugin: CurrentWallet['usePlugin'] = (...args) => {
    return useUnderliningCurrentWallet().getPlugin(...args);
  };

  return {
    useName,
    switchCurrentWallet,
    useConnectionStatus,

    connect,
    autoConnect,
    autoConnectOnce,
    disconnect,

    watchAsset: (...args) => getUnderliningCurrentWallet().watchAsset(...args),
    $getStore: (...args) => getUnderliningCurrentWallet().$getStore(...args),
    $getProvider: (...args) =>
      getUnderliningCurrentWallet().$getProvider(...args),

    getPlugin,
    usePlugin,

    ...getCombinedHooks(),
  };
};
