import type { BigNumber } from '@ethersproject/bignumber';
import { formatEther } from '@ethersproject/units';
import type { WalletApi } from '@web3-wallet/react';
import React, { useEffect, useState } from 'react';

import { Account } from './Account';

type Hooks = WalletApi['hooks'];

const useBalances = (
  provider?: ReturnType<Hooks['useProvider']>,
  accounts?: string[],
): BigNumber[] | undefined => {
  const [balances, setBalances] = useState<BigNumber[] | undefined>();

  useEffect(() => {
    if (provider && accounts?.length) {
      let stale = false;

      void Promise.all(
        accounts.map((account) => provider.getBalance(account)),
      ).then((balances) => {
        if (stale) return;
        setBalances(balances);
      });

      return () => {
        stale = true;
        setBalances(undefined);
      };
    }
  }, [provider, accounts]);

  return balances;
};

export const Accounts = ({
  accounts,
  provider,
  ENSNames,
}: {
  accounts: ReturnType<Hooks['useAccounts']>;
  provider: ReturnType<Hooks['useProvider']>;
  ENSNames: ReturnType<Hooks['useENSNames']>;
}) => {
  const balances = useBalances(provider, accounts);

  if (accounts === undefined) return null;
  if (accounts.length === 0) {
    return (
      <div>
        Accounts: <b>None</b>
      </div>
    );
  }

  return (
    <div>
      Accounts:{' '}
      <b>
        {accounts.map((account, i) =>
          ENSNames?.[i] ? (
            ENSNames?.[i]
          ) : (
            <div style={{ display: 'flex' }} key={account}>
              <Account account={account} />
              <div>
                {!!balances?.[i] &&
                  ` (Ξ${Number(formatEther(balances[i])).toFixed(4)})`}
              </div>
            </div>
          ),
        )}
      </b>
    </div>
  );
};
