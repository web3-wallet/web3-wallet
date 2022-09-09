import type { BigNumber } from '@ethersproject/bignumber';
import { formatEther } from '@ethersproject/units';
import type { Wallet } from '@web3-wallet/react';
import React, { useEffect, useState } from 'react';

import { Account } from './Account';
import { Box } from './Box';

const useBalances = (
  provider?: ReturnType<Wallet['useProvider']>,
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
  accounts: ReturnType<Wallet['useAccounts']>;
  provider: ReturnType<Wallet['useProvider']>;
  ENSNames: ReturnType<Wallet['useENSNames']>;
}) => {
  const balances = useBalances(provider, accounts);

  if (accounts === undefined) return null;
  if (accounts.length === 0) {
    return (
      <Box style={{ display: 'flex', marginBottom: 10 }}>
        <span style={{ marginRight: 10 }}>Account:</span>
        <b>None</b>
      </Box>
    );
  }

  return (
    <>
      {accounts.map((account, i) =>
        ENSNames?.[i] ? (
          ENSNames?.[i]
        ) : (
          <React.Fragment key={account}>
            <Box>
              <span style={{ marginRight: 10 }}>Account:</span>
              <b>
                <Account account={account} />
              </b>
            </Box>
            <Box>
              <span style={{ marginRight: 10 }}>Balance:</span>
              <b>
                {balances?.[i]
                  ? `Ξ ${Number(formatEther(balances[i])).toFixed(4)}`
                  : '--'}
              </b>
            </Box>
          </React.Fragment>
        ),
      )}
    </>
  );
};
