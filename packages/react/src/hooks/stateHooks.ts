import type { Hooks, State, Wallet } from '@web3-wallet/ethereum';
import { EqualityChecker, UseBoundStore } from 'zustand';

export type StateHooks = Pick<
  Hooks,
  'useChainId' | 'useAccounts' | 'useIsActivating'
>;

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
  useWalletStore: UseBoundStore<Wallet['store']>,
): StateHooks {
  const useChainId: StateHooks['useChainId'] = () => {
    return useWalletStore((s) => s.chainId);
  };

  const useAccounts: StateHooks['useAccounts'] = () => {
    return useWalletStore((s) => s.accounts, ACCOUNTS_EQUALITY_CHECKER);
  };

  const useIsActivating: StateHooks['useIsActivating'] = () => {
    return useWalletStore((s) => s.isActivating);
  };

  return { useChainId, useAccounts, useIsActivating };
}
