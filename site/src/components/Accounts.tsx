import { Flex, Text } from '@chakra-ui/react';
import type { BalancePlugin } from '@web3-wallet/plugin-balance-react';
import type { EnsPlugin } from '@web3-wallet/plugin-ens-react';
import type { Wallet } from '@web3-wallet/react';
import React from 'react';

import { Account } from './Account';

export const Accounts = ({
  accounts,
  ensNames,
  balances,
}: {
  accounts: ReturnType<Wallet['useAccounts']>;
  ensNames: ReturnType<EnsPlugin.Api['hooks']['useEnsNames']>;
  balances: ReturnType<BalancePlugin.Api['hooks']['useBalances']>;
}) => {
  if (accounts === undefined) return null;
  if (accounts.length === 0) {
    return (
      <Flex gap={2}>
        <Text>Account:</Text>
        <Text>None</Text>
      </Flex>
    );
  }

  return (
    <>
      {accounts.map((account, i) =>
        ensNames.data?.[i] ? (
          ensNames.data?.[i]
        ) : (
          <React.Fragment key={account}>
            <Flex gap={2}>
              <Text as="span">Account:</Text>
              <Account account={account} fontWeight="bold" />
            </Flex>
            <Flex gap={2}>
              <Text>Balance:</Text>
              <Text fontWeight="bold">
                {balances.data?.[i]
                  ? `${balances.data[i]}`
                  : balances.data?.[i] === 0
                  ? 0
                  : '--'}
              </Text>
            </Flex>
          </React.Fragment>
        ),
      )}
    </>
  );
};
