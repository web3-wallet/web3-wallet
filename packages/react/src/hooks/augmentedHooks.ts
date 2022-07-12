import type { Networkish } from '@ethersproject/networks';
import type { BaseProvider, Web3Provider } from '@ethersproject/providers';
import type { Connector } from '@web3-wallet/types';
import { useEffect, useMemo, useState } from 'react';

import { DerivedHooks } from './derivedHooks';
import { StateHooks } from './stateHooks';

let DynamicProvider: typeof Web3Provider | null | undefined;
async function importProvider(): Promise<void> {
  if (DynamicProvider === undefined) {
    try {
      const { Web3Provider } = await import('@ethersproject/providers');
      DynamicProvider = Web3Provider;
    } catch {
      console.debug('@ethersproject/providers not available');
      DynamicProvider = null;
    }
  }
}

export type AugmentedHooks = {
  useProvider: (
    network?: Networkish,
    enabled?: boolean,
  ) => BaseProvider | undefined;
  useENSNames: (provider?: BaseProvider) => undefined[] | (string | null)[];
  useENSName: (provider?: BaseProvider) => undefined | string | null;
};

/**
 * @returns ENSNames - An array of length `accounts.length` which contains entries which are either all `undefined`,
 * indicated that names cannot be fetched because there's no provider, or they're in the process of being fetched,
 * or `string | null`, depending on whether an ENS name has been set for the account in question or not.
 */
function useENS(
  provider?: BaseProvider,
  accounts: string[] = [],
): undefined[] | (string | null)[] {
  const [ENSNames, setENSNames] = useState<(string | null)[] | undefined>();

  useEffect(() => {
    if (provider && accounts.length) {
      let stale = false;

      Promise.all(accounts.map((account) => provider.lookupAddress(account)))
        .then((ENSNames) => {
          if (stale) return;
          setENSNames(ENSNames);
        })
        .catch((error) => {
          if (stale) return;
          console.debug('Could not fetch ENS names', error);
          setENSNames(new Array<null>(accounts.length).fill(null));
        });

      return () => {
        stale = true;
        setENSNames(undefined);
      };
    }
  }, [provider, accounts]);

  return ENSNames ?? new Array<undefined>(accounts.length).fill(undefined);
}

export const getAugmentedHooks = <T extends Connector>(
  connector: T,
  { useAccounts, useChainId }: StateHooks,
  { useAccount, useIsActive }: DerivedHooks,
): AugmentedHooks => {
  /**
   * Avoid type erasure by returning the most qualified type if not otherwise set.
   * Note that this function's return type is `T | undefined`, but there is a code path
   * that returns a Web3Provider, which could conflict with a user-provided T. So,
   * it's important that users only provide an override for T if they know that
   * `connector.customProvider` is going to be defined and of type T.
   *
   * @typeParam T - A type argument must only be provided if using `connector.customProvider`, in which case it
   * must match the type of this property.
   */
  const useProvider: AugmentedHooks['useProvider'] = (
    network,
    enabled = true,
  ) => {
    const isActive = useIsActive();
    const chainId = useChainId();

    // ensure that Provider is going to be available when loaded if @ethersproject/providers is installed
    const [loaded, setLoaded] = useState(DynamicProvider !== undefined);
    useEffect(() => {
      if (loaded) return;
      let stale = false;
      void importProvider().then(() => {
        if (stale) return;
        setLoaded(true);
      });
      return () => {
        stale = true;
      };
    }, [loaded]);

    return useMemo(() => {
      // to ensure connectors remain fresh, we condition re-renders on loaded, isActive and chainId
      void loaded && isActive && chainId;
      if (enabled) {
        if (DynamicProvider && connector.provider)
          return new DynamicProvider(
            connector.provider,
            network,
          ) as unknown as BaseProvider;
      }
    }, [loaded, enabled, isActive, chainId, network]);
  };

  const useENSNames: AugmentedHooks['useENSNames'] = (provider) => {
    const accounts = useAccounts();
    return useENS(provider, accounts);
  };

  const useENSName: AugmentedHooks['useENSName'] = (provider) => {
    const account = useAccount();
    const accounts = useMemo(
      () => (account === undefined ? undefined : [account]),
      [account],
    );
    return useENS(provider, accounts)?.[0];
  };

  return { useProvider, useENSNames, useENSName };
};
