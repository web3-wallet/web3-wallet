import type { State } from '@vvswallet/types';
import { type ComputedRef, computed } from 'vue';

export type StateHooks = {
  useChainId: () => ComputedRef<number | undefined>;
  useAccounts: () => ComputedRef<string[] | undefined>;
  useIsActivating: () => ComputedRef<boolean>;
};

export const getStateHooks = (walletState: State): StateHooks => {
  const useChainId: StateHooks['useChainId'] = () =>
    computed(() => walletState.chainId);

  const useAccounts: StateHooks['useAccounts'] = () =>
    computed(() => walletState.accounts);

  const useIsActivating: StateHooks['useIsActivating'] = () =>
    computed(() => walletState.activating);

  return { useChainId, useAccounts, useIsActivating };
};
