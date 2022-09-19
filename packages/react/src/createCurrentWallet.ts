import type { WalletName } from '@web3-wallet/core';
import { useMemo } from 'react';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import type {
  CurrentWallet,
  CurrentWalletState,
  Wallet,
  WalletBuiltinHooks,
} from './types';
import { WalletConnectionStatus } from './types';

export type CreateCurrentWalletOptions = {
  defaultCurrentWallet?: WalletName;
  persistKey?: string;
};

/**
 * Create and maintain the current wallet status.
 *
 * Context:
 * dApps usually support multiple wallets and need to maintain a current wallet.
 * The api of the current wallet is slily different with the api of a non current wallet.
 *
 * @param wallets - The wallets that can be chose as the current wallet.
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
  const { defaultCurrentWallet, persistKey = '@web3-wallet/current-wallet' } =
    options;

  if (!wallets.length) throw new Error(`wallets can't be empty`);

  const DEFAULT_STATE: CurrentWalletState = {
    connectionStatus: WalletConnectionStatus.Untouched,
    name: defaultCurrentWallet || wallets[0].name,
  };

  const store = create<CurrentWalletState>()(
    persist<CurrentWalletState>(() => DEFAULT_STATE, {
      name: persistKey,
      version: 0,
    }),
  );

  const useName: CurrentWallet['useName'] = () => store((s) => s.name);

  const switchCurrentWallet: CurrentWallet['switchCurrentWallet'] = (
    name: WalletName,
  ): void => {
    if (wallets.find((w) => w.name === name)) {
      store.setState({
        name,
      });
    } else {
      console.debug(`Wallet '${name}' don't exists`);
    }
  };

  const getUnderliningCurrentWallet = (): Wallet => {
    const currentWalletName = store.getState().name;
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
  const getCombinedHooks = (): WalletBuiltinHooks => {
    const combinedHooks: Record<string, unknown> = {};

    const {
      useChainId,
      useAccount,
      useAccounts,
      useIsConnected,
      useIsConnecting,
      useProvider,
    } = wallets[0];

    const hooks: WalletBuiltinHooks = {
      useChainId,
      useAccount,
      useAccounts,
      useIsConnected,
      useIsConnecting,
      useProvider,
    };

    for (const hookName of Object.keys(hooks)) {
      combinedHooks[hookName] = (...args: unknown[]) => {
        let hookFnOutput: unknown;
        const currentWalletName = store.getState().name;

        for (const wallet of wallets) {
          const hookFn = wallet[hookName as keyof WalletBuiltinHooks] as (
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

    return combinedHooks as WalletBuiltinHooks;
  };

  const connect: Wallet['connect'] = async (...args) => {
    const wallet = getUnderliningCurrentWallet();

    const result = await wallet.connect(...args);

    store.setState({
      connectionStatus: WalletConnectionStatus.Connected,
    });

    return result;
  };

  const autoConnect: Wallet['autoConnect'] = async (...args) => {
    const wallet = getUnderliningCurrentWallet();
    const result = await wallet.autoConnect(...args);

    if (
      store.getState().connectionStatus === WalletConnectionStatus.Disconnected
    ) {
      console.debug(`connectionId don't exists, auto connect is suppressed`);
      return false;
    }

    store.setState({
      connectionStatus: WalletConnectionStatus.Connected,
    });
    return result;
  };

  const autoConnectOnce: Wallet['autoConnectOnce'] = async (...args) => {
    const wallet = getUnderliningCurrentWallet();

    if (
      store.getState().connectionStatus === WalletConnectionStatus.Disconnected
    ) {
      console.debug(`connectionId don't exists, auto connect is suppressed`);
      return false;
    }

    const result = await wallet.autoConnectOnce(...args);

    store.setState({
      connectionStatus: WalletConnectionStatus.Connected,
    });

    return result;
  };

  const disconnect: Wallet['disconnect'] = async (...args) => {
    const wallet = getUnderliningCurrentWallet();
    const result = await wallet.disconnect(...args);
    store.setState({
      connectionStatus: WalletConnectionStatus.Disconnected,
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
    detectProvider: () => getUnderliningCurrentWallet().detectProvider(),
    getPlugin,
    usePlugin,

    ...getCombinedHooks(),
  };
};
