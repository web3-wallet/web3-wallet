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

  const getWallet = (name: WalletName): Wallet => {
    return wallets.find((w) => w.name === name) as Wallet;
  };

  const getCurrentWallet = (): Wallet => {
    const currentWalletName = store.getState().name;
    const currentWallet = getWallet(currentWalletName);

    if (currentWallet) return currentWallet;

    console.debug(
      `Wallet ${currentWalletName}, don't exist, reset current wallet to ${wallets[0].name}`,
    );

    store.setState({
      name: wallets[0].name,
      connectionStatus: WalletConnectionStatus.Untouched,
    });

    return wallets[0];
  };

  const useCurrentWallet = (): Wallet => {
    const name = useName();
    return useMemo(() => {
      // refresh useCurrentWallet when wallet name changed
      void name;
      return getCurrentWallet();
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
      const useCombinedHook = (...args: unknown[]) => {
        let hookOutput: unknown;
        const currentWalletName = useName();

        for (const wallet of wallets) {
          const useHook = wallet[hookName as keyof WalletBuiltinHooks] as (
            ...args: unknown[]
          ) => unknown;

          // eslint-disable-next-line react-hooks/rules-of-hooks
          const value = useHook(...args);

          if (wallet.name === currentWalletName) {
            hookOutput = value;
          }
        }

        return hookOutput;
      };

      combinedHooks[hookName] = useCombinedHook;
    }

    return combinedHooks as WalletBuiltinHooks;
  };

  const getConnect: (walletName?: WalletName) => Wallet['connect'] =
    (walletName) =>
    async (...args) => {
      const wallet = walletName ? getWallet(walletName) : getCurrentWallet();

      const result = await wallet.connect(...args);

      store.setState({
        name: wallet.name,
        connectionStatus: WalletConnectionStatus.Connected,
      });

      return result;
    };

  const getAutoConnect: (walletName?: WalletName) => Wallet['autoConnect'] =
    (walletName) =>
    async (...args) => {
      const wallet = walletName ? getWallet(walletName) : getCurrentWallet();
      const result = await wallet.autoConnect(...args);

      if (
        store.getState().connectionStatus ===
        WalletConnectionStatus.Disconnected
      ) {
        console.debug(`connectionId don't exists, auto connect is suppressed`);
        return false;
      }

      store.setState({
        name: wallet.name,
        connectionStatus: WalletConnectionStatus.Connected,
      });
      return result;
    };

  const getAutoConnectOnce: (
    walletName?: WalletName,
  ) => Wallet['autoConnectOnce'] =
    (walletName) =>
    async (...args) => {
      const wallet = walletName ? getWallet(walletName) : getCurrentWallet();
      if (
        store.getState().connectionStatus ===
        WalletConnectionStatus.Disconnected
      ) {
        console.debug(`connectionId don't exists, auto connect is suppressed`);
        return false;
      }

      const result = await wallet.autoConnectOnce(...args);

      store.setState({
        name: wallet.name,
        connectionStatus: WalletConnectionStatus.Connected,
      });

      return result;
    };

  const getDisconnect: (walletName?: WalletName) => Wallet['disconnect'] =
    (walletName) =>
    async (...args) => {
      const wallet = walletName ? getWallet(walletName) : getCurrentWallet();
      const result = await wallet.disconnect(...args);
      store.setState({
        connectionStatus: WalletConnectionStatus.Disconnected,
      });
      return result;
    };

  return {
    useName,
    switchCurrentWallet,
    useConnectionStatus,

    connect: getConnect(),
    connectWith: (name, ...args) => getConnect(name)(...args),

    autoConnect: getAutoConnect(),
    autoConnectWith: (name, ...args) => getAutoConnect(name)(...args),

    autoConnectOnce: getAutoConnectOnce(),
    autoConnectOnceWith: (name, ...args) => getAutoConnectOnce(name)(...args),

    disconnectWith: (name, ...args) => getDisconnect(name)(...args),
    disconnect: getDisconnect(),

    watchAsset: (...args) => getCurrentWallet().watchAsset(...args),
    watchAssetWith: (name, ...args) => getWallet(name).watchAsset(...args),

    $getStore: (...args) => getCurrentWallet().$getStore(...args),
    $getProvider: (...args) => getCurrentWallet().$getProvider(...args),
    detectProvider: () => getCurrentWallet().detectProvider(),

    getPlugin: (...args) => getCurrentWallet().getPlugin(...args),
    usePlugin: (...args) => useCurrentWallet().getPlugin(...args),

    ...getCombinedHooks(),
  };
};
