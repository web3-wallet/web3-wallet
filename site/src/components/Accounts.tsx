import { Flex, Text } from '@chakra-ui/react';
import type { BigNumber } from '@ethersproject/bignumber';
import { formatEther } from '@ethersproject/units';
import type { Wallet } from '@web3-wallet/react';
import React, { useEffect, useState } from 'react';

import { Account } from './Account';

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
      <Flex gap={2}>
        <Text>Account:</Text>
        <Text>None</Text>
      </Flex>
    );
  }

  return (
    <>
      {accounts.map((account, i) =>
        ENSNames?.[i] ? (
          ENSNames?.[i]
        ) : (
          <React.Fragment key={account}>
            <Flex gap={2}>
              <Text as="span">Account:</Text>
              <Account account={account} fontWeight="bold" />
            </Flex>
            <Flex gap={2}>
              <Text>Balance:</Text>
              <Text fontWeight="bold">
                {balances?.[i]
                  ? `${Number(formatEther(balances[i])).toFixed(4)}`
                  : '--'}
              </Text>
            </Flex>
          </React.Fragment>
        ),
      )}
    </>
  );
};
