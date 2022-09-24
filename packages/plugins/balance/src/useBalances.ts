import type { BaseProvider } from '@ethersproject/providers';
import { formatEther } from '@ethersproject/units';
import type { AsyncFetchResult } from '@web3-wallet/react';
import { useEffect, useState } from 'react';

export type Balances = (number | undefined)[];

export const useBalances = (
  provider?: BaseProvider,
  accounts: string[] = [],
  precision = 4,
): AsyncFetchResult<Balances> => {
  const [data, setData] =
    useState<AsyncFetchResult<Balances>['data']>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (!provider || !accounts.length) return;

    let stale = false;

    setIsLoading(true);

    Promise.all(accounts.map((account) => provider.getBalance(account)))
      .then((balances) => {
        if (stale) return;

        setData(
          balances.map((v) =>
            v
              ? Number(Number(formatEther(v)).toFixed(precision))
              : v === 0
              ? 0
              : undefined,
          ),
        );
      })
      .catch((error) => {
        console.log('cache', error);
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
