import type { Hooks, State } from '@web3-wallet/ethereum';

import { StateHooks } from './stateHooks';

const computeIsActive = ({ chainId, accounts, isActivating }: State) => {
  return Boolean(chainId && accounts && !isActivating);
};

export type DerivedHooks = Pick<Hooks, 'useAccount' | 'useIsActive'>;

export const getDerivedHooks = ({
  useChainId,
  useAccounts,
  useIsActivating,
}: StateHooks): DerivedHooks => {
  const useAccount: DerivedHooks['useAccount'] = () => {
    return useAccounts()?.[0];
  };

  const useIsActive: DerivedHooks['useIsActive'] = () => {
    const chainId = useChainId();
    const accounts = useAccounts();
    const isActivating = useIsActivating();

    return computeIsActive({
      chainId,
      accounts,
      isActivating,
    });
  };

  return { useAccount, useIsActive };
};
