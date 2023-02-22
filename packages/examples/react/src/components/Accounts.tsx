import { formatEther } from '@ethersproject/units';
import type { Wallet } from '@web3-wallet/react';
import React from 'react';

import { Account } from './Account';
import { Box } from './Box';

export const Accounts = ({
  accounts,
  balances,
  ensNames,
}: {
  accounts: ReturnType<Wallet['useAccounts']>;
  balances: ReturnType<Wallet['useBalances']>;
  ensNames: ReturnType<Wallet['useEnsNames']>;
}) => {
  if (!accounts || accounts.length === 0) {
    return (
      <Box style={{ display: 'flex', marginBottom: 10 }}>
        <span style={{ marginRight: 10 }}>Account:</span>
        <b>None</b>
      </Box>
    );
  }

  return (
    <>
      {accounts.map((account, i) => (
        <React.Fragment key={account}>
          {ensNames[i] && (
            <Box>
              <span style={{ marginRight: 10 }}>Name: </span>
              <b>{ensNames[i]}</b>
            </Box>
          )}
          <Box>
            <span style={{ marginRight: 10 }}>Account:</span>
            <b>
              <Account account={account} />
            </b>
          </Box>
          <Box>
            <span style={{ marginRight: 10 }}>Balance:</span>
            <b>
              {balances[i] ? Number(formatEther(balances[i])).toFixed(4) : '--'}
            </b>
          </Box>
        </React.Fragment>
      ))}
    </>
  );
};
