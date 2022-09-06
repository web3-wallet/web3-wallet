import type { WalletName } from '@web3-wallet/core';
import { useMemo } from 'react';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import type { Wallet } from './types';

type SelectedWalletState = {
  selectedWallet?: WalletName;
  isDisconnected: boolean;
};

export const createSelectedWallet = (
  wallets: Wallet[],
  options: {
    defaultSelectedWallet?: WalletName;
  } = {},
): {
  useSelectedWallet: () => Wallet;
  setSelectedWallet: (walletName: WalletName) => void;
  useIsDisconnected: () => boolean;
} => {
  const { defaultSelectedWallet } = options;

  if (!wallets.length) throw new Error(`wallets can't be empty`);

  const store = create<SelectedWalletState>()(
    persist(
      () =>
        ({
          isDisconnected: false,
          selectedWallet: defaultSelectedWallet || wallets[0].name,
        } as SelectedWalletState),
      {
        name: '@web3-wallet',
        version: 0,
      },
    ),
  );

  const setSelectedWallet = (selectedWallet: WalletName): void => {
    store.setState({
      selectedWallet,
    });
  };

  const useIsDisconnected = (): boolean => {
    return store((s) => s.isDisconnected);
  };

  const useSelectedWallet = () => {
    const selectedWalletName = store((s) => s.selectedWallet);
    return useMemo((): Wallet => {
      const selectedWallet = wallets.find(
        (w) => w.name === selectedWalletName,
      ) as Wallet;

      /**
       * If we don't combine the hooks, the hooks will be called base on
       * selectedWalletName, which violates the react hook rules.
       *
       * Combine hooks to always call all the hooks in consistent order
       *  so that we don't violates the react hook rules:
       *
       * https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level
       */
      const combinedHooks: Record<string, unknown> = {};

      for (const hookName of Object.keys(selectedWallet.hooks)) {
        combinedHooks[hookName] = (...args: unknown[]) => {
          let hookFnOutput: unknown;

          for (const wallet of wallets) {
            const hookFn = wallet.hooks[hookName as keyof Wallet['hooks']] as (
              ...args: unknown[]
            ) => unknown;

            const value = hookFn(...args);

            if (wallet.name === selectedWallet.name) {
              hookFnOutput = value;
            }
          }

          return hookFnOutput;
        };
      }

      return { ...selectedWallet, hooks: combinedHooks } as Wallet;
    }, [selectedWalletName]);
  };

  return {
    useSelectedWallet,
    setSelectedWallet,
    useIsDisconnected,
  };
};
