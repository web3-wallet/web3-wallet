import { useEffect, useState } from 'react';

import type { Wallet } from '../types';

export type BalanceHooks = {
  useBalances: () => bigint[];
  useBalance: () => bigint | undefined;
};

export const createBalanceHooks = (wallet: Wallet): BalanceHooks => {
  const { useProvider, useAccounts } = wallet;

  const useBalances: BalanceHooks['useBalances'] = () => {
    const provider = useProvider();
    const accounts = useAccounts();
    const [balances, setBalances] = useState<bigint[]>([]);

    useEffect(() => {
      let canceled = false;

      if (!provider || !accounts || !accounts.length) {
        setBalances([]);

        return;
      }

      Promise.all(accounts.map((account) => provider.getBalance(account)))
        .then((balances) => {
          if (!canceled) setBalances(balances);
        })
        .catch(() => {
          if (!canceled) setBalances([]);
        });

      return () => {
        canceled = true;
      };
    }, [provider, accounts]);

    return balances;
  };

  const useBalance: BalanceHooks['useBalance'] = () => {
    const balances = useBalances();

    return balances[0];
  };

  return {
    useBalances,
    useBalance,
  };
};
