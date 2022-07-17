import type { Hooks, State } from '@web3-wallet/ethereum';
import { computed } from 'vue';

export type StateHooks = Pick<
  Hooks,
  'useChainId' | 'useAccounts' | 'useIsActivating'
>;

export const getStateHooks = (walletState: State): StateHooks => {
  const useChainId: StateHooks['useChainId'] = () =>
    computed(() => walletState.chainId).value;

  const useAccounts: StateHooks['useAccounts'] = () =>
    computed(() => walletState.accounts).value;

  const useIsActivating: StateHooks['useIsActivating'] = () =>
    computed(() => walletState.isActivating).value;

  return { useChainId, useAccounts, useIsActivating };
};
