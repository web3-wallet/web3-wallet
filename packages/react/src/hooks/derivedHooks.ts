import type { State } from '@web3-wallet/core';

import type { Wallet } from '../types';
import type { StateHooks } from './stateHooks';

const computeIsConnected = ({ chainId, accounts, isConnecting }: State) => {
  return Boolean(chainId && accounts?.length && !isConnecting);
};

export type DerivedHooks = Pick<
  Wallet['hooks'],
  'useAccount' | 'useIsConnected'
>;

export const getDerivedHooks = ({
  useChainId,
  useAccounts,
  useIsConnecting,
}: StateHooks): DerivedHooks => {
  const useAccount: DerivedHooks['useAccount'] = () => {
    return useAccounts()?.[0];
  };

  const useIsConnected: DerivedHooks['useIsConnected'] = () => {
    const chainId = useChainId();
    const accounts = useAccounts();
    const isConnecting = useIsConnecting();

    return computeIsConnected({
      chainId,
      accounts,
      isConnecting,
    });
  };

  return { useAccount, useIsConnected };
};
