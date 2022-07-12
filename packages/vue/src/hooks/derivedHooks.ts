import type { State } from '@web3-wallet/connector';
import { type ComputedRef, computed } from 'vue';

import type { StateHooks } from './stateHooks';

export type DerivedHooks = {
  useAccount: () => ComputedRef<string | undefined>;
  useIsActive: () => ComputedRef<boolean>;
};

const computeIsActive = ({ chainId, accounts, activating }: State): boolean => {
  return Boolean(chainId && accounts && !activating);
};

export const getDerivedHooks = ({
  useChainId,
  useAccounts,
  useIsActivating,
}: StateHooks): DerivedHooks => {
  const useAccount: DerivedHooks['useAccount'] = () =>
    computed(() => useAccounts().value?.[0]);

  const useIsActive: DerivedHooks['useIsActive'] = () =>
    computed(() => {
      return computeIsActive({
        chainId: useChainId().value,
        accounts: useAccounts().value,
        activating: useIsActivating().value,
      });
    });

  return { useAccount, useIsActive };
};
