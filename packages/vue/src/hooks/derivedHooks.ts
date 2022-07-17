import type { Hooks, State } from '@web3-wallet/ethereum';
import { computed } from 'vue';

import type { StateHooks } from './stateHooks';

export type DerivedHooks = Pick<Hooks, 'useIsActive' | 'useAccount'>;

const computeIsActive = ({
  chainId,
  accounts,
  isActivating,
}: State): boolean => {
  return Boolean(chainId && accounts && !isActivating);
};

export const getDerivedHooks = ({
  useChainId,
  useAccounts,
  useIsActivating,
}: StateHooks): DerivedHooks => {
  const useAccount: DerivedHooks['useAccount'] = () =>
    computed(() => useAccounts()?.[0]).value;

  const useIsActive: DerivedHooks['useIsActive'] = () =>
    computed(() => {
      return computeIsActive({
        chainId: useChainId(),
        accounts: useAccounts(),
        isActivating: useIsActivating(),
      });
    }).value;

  return { useAccount, useIsActive };
};
