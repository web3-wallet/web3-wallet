import type { BaseProvider } from '@ethersproject/providers';
import { useEffect, useState } from 'react';

export const useENS = (
  provider?: BaseProvider,
  accounts: string[] = [],
): (string | undefined)[] => {
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
};
