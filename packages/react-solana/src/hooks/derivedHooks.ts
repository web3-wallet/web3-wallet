import type { State } from '@web3-wallet/solana';

import type { Wallet } from '../types';
import { StateHooks } from './stateHooks';

const computeIsActive = ({ account, isActivating }: State) => {
  return Boolean(account && !isActivating);
};

export type DerivedHooks = Pick<Wallet, 'useIsActive'>;

export const getDerivedHooks = ({
  useAccount,
  useIsActivating,
}: StateHooks): DerivedHooks => {
  const useIsActive: DerivedHooks['useIsActive'] = () => {
    const account = useAccount();
    const isActivating = useIsActivating();

    return computeIsActive({
      account,
      isActivating,
    });
  };

  return { useIsActive };
};
