import {
  type BaseProvider,
  type Networkish,
  Web3Provider,
} from '@ethersproject/providers';
import { useMemo } from 'react';

import type { Wallet } from '../types';

export type ProviderHooks = {
  useProvider: <T extends BaseProvider = Web3Provider>(
    network?: Networkish,
  ) => T | undefined;
};

export const createProviderHooks = (wallet: Wallet): ProviderHooks => {
  const { useAccount, useChainId, getConnector } = wallet;

  const useProvider = <T extends BaseProvider = Web3Provider>(
    network?: Networkish,
  ) => {
    const account = useAccount();
    const chainId = useChainId();

    return useMemo(() => {
      // to ensure connectors remain fresh, we condition re-renders
      // when ImportedWeb3Provider account, chainId changed
      void account && chainId;
      const provider = getConnector().provider;

      if (provider) {
        return new Web3Provider(provider, network) as unknown as T;
      }

      return undefined;
    }, [account, chainId, network]);
  };

  return {
    useProvider,
  };
};
