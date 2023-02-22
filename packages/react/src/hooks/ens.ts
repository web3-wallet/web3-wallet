import type { Networkish } from '@ethersproject/networks';
import { useEffect, useState } from 'react';

import type { Wallet } from '../types';

export type EnsHooks = {
  useEnsNames: (network?: Networkish) => string[];
  useEnsName: (network?: Networkish) => string | undefined;
};

export const createEnsHooks = (wallet: Wallet) => {
  const { useProvider, useAccounts } = wallet;

  const useEnsNames: EnsHooks['useEnsNames'] = (network?: Networkish) => {
    const provider = useProvider(network);
    const accounts = useAccounts();
    const [ensNames, setEnsNames] = useState<string[]>([]);

    useEffect(() => {
      let canceled = false;

      if (!provider || !accounts || !accounts.length) {
        setEnsNames([]);
        return;
      }

      Promise.all(accounts.map((account) => provider.lookupAddress(account)))
        .then((ensNames) => {
          if (!canceled) setEnsNames(ensNames.filter((v) => !!v) as string[]);
        })
        .catch(() => {
          if (!canceled) setEnsNames([]);
        });

      return () => {
        canceled = true;
      };
    }, [accounts, provider]);

    return ensNames;
  };

  const useEnsName: EnsHooks['useEnsName'] = () => {
    const ensNames = useEnsNames();

    return ensNames[0];
  };

  return {
    useEnsNames,
    useEnsName,
  };
};
