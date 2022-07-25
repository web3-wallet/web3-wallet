import { UseBoundStore } from 'zustand';

import type { Wallet } from '../types';

export type StateHooks = Pick<Wallet, 'useAccount' | 'useIsActivating'>;

export function getStateHooks(
  useStore: UseBoundStore<Wallet['store']>,
): StateHooks {
  const useAccount: StateHooks['useAccount'] = () => {
    return useStore((s) => s.account);
  };

  const useIsActivating: StateHooks['useIsActivating'] = () => {
    return useStore((s) => s.isActivating);
  };

  return { useAccount, useIsActivating };
}
