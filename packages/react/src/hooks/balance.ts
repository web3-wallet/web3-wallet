import type { BigNumber } from '@ethersproject/bignumber';
import { useEffect, useState } from 'react';

import type { Wallet } from '../types';

export type BalanceHooks = {
  useBalances: () => BigNumber[];
  useBalance: () => BigNumber;
};

export const createBalanceHooks = (wallet: Wallet): BalanceHooks => {
  const { useProvider, useAccounts } = wallet;

  const useBalances = () => {
    const provider = useProvider();
    const accounts = useAccounts();
    const [balances, setBalances] = useState<BigNumber[]>([]);

    useEffect(() => {
      let canceled = false;

      if (!provider || !accounts || !accounts.length) {
        setBalances([]);

        return;
      }

      Promise.all(accounts.map((account) => provider.getBalance(account))).then(
        (balances) => {
          if (!canceled) setBalances(balances);
        },
      );

      return () => {
        canceled = true;
      };
    }, [provider, accounts]);

    return balances;
  };

  const useBalance = () => {
    const balances = useBalances();

    return balances[0];
  };

  return {
    useBalances,
    useBalance,
  };
};
