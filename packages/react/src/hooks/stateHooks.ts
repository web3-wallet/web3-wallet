import { State, Store } from '@web3-wallet/abstract-connector';
import { EqualityChecker, UseBoundStore } from 'zustand';

export type StateHooks = {
  useChainId: () => number | undefined;
  useAccounts: () => string[] | undefined;
  useIsActivating: () => boolean;
};

const ACCOUNTS_EQUALITY_CHECKER: EqualityChecker<State['accounts']> = (
  oldAccounts,
  newAccounts,
) => {
  if (oldAccounts === undefined && newAccounts === undefined) return true;
  if (oldAccounts === undefined && newAccounts !== undefined) return false;
  if (oldAccounts !== undefined && newAccounts === undefined) return false;
  if (oldAccounts?.length !== newAccounts?.length) return false;

  return !!oldAccounts?.every(
    (oldAccount, i) => oldAccount === newAccounts?.[i],
  );
};

export function getStateHooks(
  useWalletStore: UseBoundStore<Store>,
): StateHooks {
  const useChainId: StateHooks['useChainId'] = () => {
    return useWalletStore((s) => s.chainId);
  };

  const useAccounts: StateHooks['useAccounts'] = () => {
    return useWalletStore((s) => s.accounts, ACCOUNTS_EQUALITY_CHECKER);
  };

  const useIsActivating: StateHooks['useIsActivating'] = () => {
    return useWalletStore((s) => s.activating);
  };

  return { useChainId, useAccounts, useIsActivating };
}
