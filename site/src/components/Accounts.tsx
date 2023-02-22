import { Flex, Text } from '@chakra-ui/react';
import { formatEther } from '@ethersproject/units';
import type { Wallet } from '@web3-wallet/react';
import React from 'react';

import { Account } from './Account';

export const Accounts = ({
  accounts,
  ensNames,
  balances,
}: {
  accounts: ReturnType<Wallet['useAccounts']>;
  ensNames: ReturnType<Wallet['useEnsNames']>;
  balances: ReturnType<Wallet['useBalances']>;
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
          {ensNames[i] && (
            <Flex gap={2}>
              <Text as="span">Name: </Text>
              <Text fontWeight="bold">{ensNames[i]}</Text>
            </Flex>
          )}
          <Flex gap={2}>
            <Text as="span">Account:</Text>
            <Account account={account} fontWeight="bold" />
          </Flex>
          <Flex gap={2}>
            <Text>Balance:</Text>
            <Text fontWeight="bold">
              {balances[i] ? Number(formatEther(balances[i])).toFixed(4) : '--'}
            </Text>
          </Flex>
        </React.Fragment>
      ))}
    </>
  );
};
