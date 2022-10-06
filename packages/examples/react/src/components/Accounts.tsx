import type { BalancePlugin } from '@web3-wallet/plugin-balance';
import type { EnsPlugin } from '@web3-wallet/plugin-ens';
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
  balances: ReturnType<BalancePlugin.Api['useBalances']>;
  ensNames: ReturnType<EnsPlugin.Api['useEnsNames']>;
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
          {ensNames.data?.[i] && (
            <Box>
              <span style={{ marginRight: 10 }}>Name: </span>
              <b>{ensNames.data?.[i]}</b>
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
              {balances.data?.[i]
                ? `${balances.data[i]}`
                : balances.data?.[i] === 0
                ? 0
                : '--'}
            </b>
          </Box>
        </React.Fragment>
      ))}
    </>
  );
};
