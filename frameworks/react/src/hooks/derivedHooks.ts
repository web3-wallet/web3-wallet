import { State } from '@web3-wallet/types';

import { StateHooks } from './stateHooks';

const computeIsActive = ({ chainId, accounts, activating }: State) => {
  return Boolean(chainId && accounts && !activating);
};

export type DerivedHooks = {
  useAccount: () => string | undefined;
  useIsActive: () => boolean;
};

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
    const activating = useIsActivating();

    return computeIsActive({
      chainId,
      accounts,
      activating,
    });
  };

  return { useAccount, useIsActive };
};
