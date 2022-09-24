import type { BaseProvider } from '@ethersproject/providers';
import type { AsyncFetchResult } from 'packages/react/dist/esm';
import { useEffect, useState } from 'react';

export type EnsNames = (string | undefined)[];
export const useEnsNames = (
  provider?: BaseProvider,
  accounts: string[] = [],
): AsyncFetchResult<EnsNames> => {
  const [data, setData] =
    useState<AsyncFetchResult<EnsNames>['data']>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (!provider || !accounts.length) return;
    let stale = false;

    setIsLoading(true);

    Promise.all(accounts.map((account) => provider.lookupAddress(account)))
      .then((ENSNames) => {
        if (stale) return;
        setData(ENSNames.map((v) => (v ? v : undefined)));
      })
      .catch((error) => {
        if (stale) return;
        console.debug('Could not fetch ENS names', error);

        setError(error);
        setData(undefined);
      })
      .finally(() => {
        if (stale) return;
        setIsLoading(false);
      });

    return () => {
      stale = true;
      setData(undefined);
    };
  }, [provider, accounts]);

  return {
    data,
    isLoading,
    error,
  };
};
