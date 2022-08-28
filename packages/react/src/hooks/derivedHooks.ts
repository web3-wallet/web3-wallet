import type { State } from '@web3-wallet/core';

import type { Wallet } from '../types';
import { StateHooks } from './stateHooks';

const computeIsActive = ({ chainId, accounts, isActivating }: State) => {
  return Boolean(chainId && accounts?.length && !isActivating);
};

export type DerivedHooks = Pick<Wallet['hooks'], 'useAccount' | 'useIsActive'>;

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
