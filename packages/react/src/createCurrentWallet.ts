import type { WalletName } from '@web3-wallet/core';
import { UserConnectionStatus } from '@web3-wallet/core';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import type {
  CurrentWallet,
  CurrentWalletState,
  Wallet,
  WalletHooks,
} from './types';

/**
 * @param wallets - The wallets to proxy with
 * @param options - The options object
 * @param options.defaultCurrentWallet - the optional defaultCurrentWallet, default to the first wallets[0].name
 * @param options.key - the optional persist key, default to "@web3-wallet"
 *   if you are creating multiple CurrentWallet, you must provide a stable and unique key to avoid
 *   the persist key clash.
 * @returns CurrentWallet - the crate wallet proxy api
 */
export const createCurrentWallet = (
  wallets: Wallet[],
  options: {
    defaultCurrentWallet?: WalletName;
    key?: string;
  } = {},
): CurrentWallet => {
  const { defaultCurrentWallet, key = '@web3-wallet' } = options;
  wallets = wallets.slice();

  if (!wallets.length) throw new Error(`wallets can't be empty`);

  const store = create<CurrentWalletState>()(
    persist(
      () =>
        ({
          userConnectionStatus: UserConnectionStatus.UserUntouched,
          currentWallet: defaultCurrentWallet || wallets[0].name,
        } as CurrentWalletState),
      {
        name: key,
        version: 0,
      },
    ),
  );

  const useName: CurrentWallet['useName'] = () => store((s) => s.currentWallet);
  const getCurrentWallet = (): Wallet => {
    const currentWalletName = store.getState().currentWallet;
    return wallets.find((w) => w.name === currentWalletName) as Wallet;
  };

  const setCurrentWallet: CurrentWallet['setCurrentWallet'] = (
    currentWallet: WalletName,
  ): void => {
    store.setState({
      currentWallet,
    });
  };

  const useUserConnectionStatus: CurrentWallet['useUserConnectionStatus'] =
    () => {
      return store((s) => s.userConnectionStatus);
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
  const getCombinedHooks = (): WalletHooks => {
    const combinedHooks: Record<string, unknown> = {};

    const {
      useChainId,
      useAccount,
      useAccounts,
      useUserConnectionStatus,
      useENSName,
      useENSNames,
      useIsConnected,
      useIsConnecting,
      useProvider,
    } = wallets[0];

    const hooks: WalletHooks = {
      useChainId,
      useAccount,
      useAccounts,
      useUserConnectionStatus,
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
          const hookFn = wallet[hookName as keyof WalletHooks] as (
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

    return combinedHooks as WalletHooks;
  };

  const connect: Wallet['connect'] = async (...args) => {
    const wallet = getCurrentWallet();

    const result = await wallet.connect(...args);

    store.setState({
      userConnectionStatus: UserConnectionStatus.UserConnected,
    });

    return result;
  };

  const autoConnect: Wallet['autoConnect'] = async (...args) => {
    const wallet = getCurrentWallet();
    const result = await wallet.autoConnect(...args);

    if (
      store.getState().userConnectionStatus ===
      UserConnectionStatus.UserDisconnected
    ) {
      console.debug(`connectionId don't exists, auto connect is suppressed`);
      return false;
    }

    store.setState({
      userConnectionStatus: UserConnectionStatus.UserConnected,
    });
    return result;
  };

  const autoConnectOnce: Wallet['autoConnectOnce'] = async (...args) => {
    const wallet = getCurrentWallet();

    if (
      store.getState().userConnectionStatus ===
      UserConnectionStatus.UserDisconnected
    ) {
      console.debug(`connectionId don't exists, auto connect is suppressed`);
      return false;
    }

    const result = await wallet.autoConnectOnce(...args);

    store.setState({
      userConnectionStatus: UserConnectionStatus.UserConnected,
    });

    return result;
  };

  const disconnect: Wallet['disconnect'] = async (...args) => {
    const wallet = getCurrentWallet();
    const result = await wallet.disconnect(...args);
    store.setState({
      userConnectionStatus: UserConnectionStatus.UserDisconnected,
    });
    return result;
  };

  return {
    wallets,
    setCurrentWallet,
    useName,

    connect,
    autoConnect,
    autoConnectOnce,
    disconnect,
    watchAsset: (...args) => getCurrentWallet().watchAsset(...args),

    ...getCombinedHooks(),
    useUserConnectionStatus,
  };
};
