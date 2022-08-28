import type { WalletName } from '@web3-wallet/core';
import { useMemo, useRef } from 'react';

import type { Wallet } from './types';

/**
 *
 * @param selectedWalletName
 * @param wallets wallets for select
 * @returns the selected wallet
 */
export const useSelectedWallet = (
  selectedWalletName: WalletName,
  wallets: Wallet[],
) => {
  const walletsRef = useRef<Wallet[]>(wallets);
  walletsRef.current = wallets;

  /**
   * The selected Wallet must be in the wallet list
   */
  if (!walletsRef.current.find((w) => w.name === selectedWalletName)) {
    throw new Error(`${selectedWalletName} not found`);
  }

  return useMemo((): Wallet => {
    const currentWallet = walletsRef.current.find(
      (w) => w.connector.name === selectedWalletName,
    ) as Wallet;

    const { hooks, name: currentWalletName } = currentWallet;

    /**
     * If we don't combine the hooks, the hooks will be called base on
     * selectedWalletName, which violates the react hook rules.
     *
     * Combine hooks to always call all the hooks in consistent order
     *  so that we don't violates the react hook rules:
     *
     * https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level
     */
    const combineHooks: Record<string, unknown> = {};

    for (const hookName of Object.keys(hooks)) {
      combineHooks[hookName] = (...args: unknown[]) => {
        for (const wallet of walletsRef.current) {
          let currentRetValue: unknown;

          const hookFn = wallet.hooks[hookName as keyof Wallet['hooks']] as (
            ...args: unknown[]
          ) => unknown;

          const retValue = hookFn(...args);

          if (wallet.name === currentWalletName) {
            currentRetValue = retValue;
          }

          return currentRetValue;
        }
      };
    }

    return { ...currentWallet, hooks: combineHooks } as Wallet;
  }, [selectedWalletName]);
};
