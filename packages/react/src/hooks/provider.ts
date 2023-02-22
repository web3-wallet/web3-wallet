import {
  type BaseProvider,
  type Networkish,
  Web3Provider,
} from '@ethersproject/providers';
import type { Connector } from '@web3-wallet/core';
import { useEffect, useMemo, useState } from 'react';

import type { Wallet } from '../types';

export type ProviderHooks = {
  useProvider: <T extends BaseProvider = Web3Provider>(
    network?: Networkish,
  ) => T | undefined;
  useHasProvider: (
    providerFilter?: Parameters<Connector['detectProvider']>[0],
    options?: Parameters<Connector['detectProvider']>[1],
  ) => boolean;
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

  const useHasProvider: ProviderHooks['useHasProvider'] = (...args) => {
    const [hasProvider, setHasProvider] = useState(false);

    useEffect(() => {
      let canceled = false;

      getConnector()
        .detectProvider(...args)
        .then(() => {
          if (!canceled) setHasProvider(true);
        })
        .catch(() => {
          if (!canceled) setHasProvider(false);
        });

      return () => {
        canceled = true;
      };
      // don't track the args updates
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return hasProvider;
  };

  return {
    useProvider,
    useHasProvider,
  };
};
