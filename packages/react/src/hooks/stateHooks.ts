import type { State } from '@web3-wallet/core';
import { UseBoundStore } from 'zustand';

import type { Wallet } from '../types';

export type StateHooks = Pick<
  Wallet,
  'useChainId' | 'useAccounts' | 'useIsActivating'
>;

const ACCOUNTS_EQUALITY_CHECKER: (
  a: State['accounts'],
  b: State['accounts'],
) => boolean = (oldAccounts, newAccounts) => {
  if (oldAccounts === undefined && newAccounts === undefined) return true;
  if (oldAccounts === undefined && newAccounts !== undefined) return false;
  if (oldAccounts !== undefined && newAccounts === undefined) return false;
  if (oldAccounts?.length !== newAccounts?.length) return false;

  return !!oldAccounts?.every(
    (oldAccount, i) => oldAccount === newAccounts?.[i],
  );
};

export function getStateHooks(
  useStore: UseBoundStore<Wallet['store']>,
): StateHooks {
  const useChainId: StateHooks['useChainId'] = () => {
    return useStore((s) => s.chainId);
  };

  const useAccounts: StateHooks['useAccounts'] = () => {
    return useStore((s) => s.accounts, ACCOUNTS_EQUALITY_CHECKER);
  };

  const useIsActivating: StateHooks['useIsActivating'] = () => {
    return useStore((s) => s.isActivating);
  };

  return { useChainId, useAccounts, useIsActivating };
}
