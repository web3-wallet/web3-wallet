import { Flex, Text } from '@chakra-ui/react';
import type { BalancePlugin } from '@web3-wallet/plugin-balance';
import type { EnsPlugin } from '@web3-wallet/plugin-ens';
import type { Wallet } from '@web3-wallet/react';
import React from 'react';

import { Account } from './Account';

export const Accounts = ({
  accounts,
  ensNames,
  balances,
}: {
  accounts: ReturnType<Wallet['useAccounts']>;
  ensNames: ReturnType<EnsPlugin.Api['useEnsNames']>;
  balances: ReturnType<BalancePlugin.Api['useBalances']>;
}) => {
  if (!accounts || accounts.length === 0) {
    return (
      <Flex gap={2}>
        <Text>Account:</Text>
        <Text>None</Text>
      </Flex>
    );
  }

  return (
    <>
      {accounts.map((account, i) => (
        <React.Fragment key={account}>
          {ensNames.data?.[i] && (
            <Flex gap={2}>
              <Text as="span">Name: </Text>
              <Text fontWeight="bold">{ensNames.data?.[i]}</Text>
            </Flex>
          )}
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
      ))}
    </>
  );
};
