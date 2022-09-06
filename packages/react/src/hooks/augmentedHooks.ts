import type {
  BaseProvider,
  Networkish,
  Web3Provider,
} from '@ethersproject/providers';
import type { AbstractConnector } from '@web3-wallet/core';
import { useEffect, useMemo, useState } from 'react';

import type { Wallet } from '../types';
import type { DerivedHooks } from './derivedHooks';
import type { StateHooks } from './stateHooks';
import { useImportWeb3Provider } from './useImportWeb3Provider';

export type AugmentedHooks = Pick<
  Wallet['hooks'],
  'useProvider' | 'useENSNames' | 'useENSName'
>;

function useENS(
  provider?: BaseProvider,
  accounts: string[] = [],
): (string | undefined)[] {
  const [ENSNames, setENSNames] = useState<
    (string | undefined)[] | undefined
  >();

  useEffect(() => {
    if (provider && accounts.length) {
      let stale = false;

      Promise.all(accounts.map((account) => provider.lookupAddress(account)))
        .then((ENSNames) => {
          if (stale) return;
          setENSNames(ENSNames.map((v) => (v ? v : undefined)));
        })
        .catch((error) => {
          if (stale) return;
          console.debug('Could not fetch ENS names', error);
          setENSNames(new Array<undefined>(accounts.length).fill(undefined));
        });

      return () => {
        stale = true;
        setENSNames(undefined);
      };
    }
  }, [provider, accounts]);

  return ENSNames ?? new Array<undefined>(accounts.length).fill(undefined);
}

export const getAugmentedHooks = <T extends AbstractConnector>(
  connector: T,
  { useAccounts, useChainId }: StateHooks,
  { useAccount, useIsConnected }: DerivedHooks,
): AugmentedHooks => {
  const useProvider = <T extends BaseProvider = Web3Provider>(
    network?: Networkish,
  ) => {
    const isConnected = useIsConnected();
    const chainId = useChainId();
    const ImportedWeb3Provider = useImportWeb3Provider();

    return useMemo(() => {
      // to ensure connectors remain fresh, we condition re-renders on loaded, isConnected and chainId
      void isConnected && chainId;
      if (ImportedWeb3Provider && connector.provider) {
        return new ImportedWeb3Provider(
          connector.provider,
          network,
        ) as unknown as T;
      }
      return undefined;
    }, [ImportedWeb3Provider, isConnected, chainId, network]);
  };

  const useENSNames: AugmentedHooks['useENSNames'] = (provider) => {
    const accounts = useAccounts();
    return useENS(provider, accounts);
  };

  const useENSName: AugmentedHooks['useENSName'] = (provider) => {
    const account = useAccount();
    const accounts = useMemo(
      () => (account === undefined ? [] : [account]),
      [account],
    );
    return useENS(provider, accounts)?.[0];
  };

  return { useProvider, useENSNames, useENSName };
};
