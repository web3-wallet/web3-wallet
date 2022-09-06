import type { Wallet } from '@web3-wallet/react';
import { useEffect } from 'react';

import { Accounts } from './Accounts';
import { Card } from './Card';
import { Chain } from './Chain';
import { ConnectWithSelect } from './ConnectWithSelect';
import { Status } from './Status';

type Props = {
  name: Wallet['name'];
  connect: Wallet['connector']['connect'];
  disconnect: Wallet['connector']['disconnect'];
  autoConnectOnce: Wallet['connector']['autoConnectOnce'];
} & Wallet['hooks'];

export const WalletCard = ({
  name,

  connect,
  disconnect,
  autoConnectOnce,

  useChainId,
  useAccounts,
  useIsActivating,
  useIsActive,
  useProvider,
  useENSNames,
}: Props) => {
  const chainId = useChainId();
  const accounts = useAccounts();
  const isActivating = useIsActivating();

  const isActive = useIsActive();

  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  // attempt to connect eagerly on mount
  useEffect(() => {
    autoConnectOnce()?.catch((e) => {
      console.debug('Failed to connect eagerly', e);
    });
  }, [autoConnectOnce]);

  return (
    <Card>
      <b>{name}</b>
      <div>Category: Ethereum</div>
      <Status isActivating={isActivating} isActive={isActive} />
      <Chain chainId={chainId} />
      <Accounts accounts={accounts} provider={provider} ENSNames={ENSNames} />
      <ConnectWithSelect
        connect={connect}
        disconnect={disconnect}
        chainId={chainId}
        isActivating={isActivating}
        isActive={isActive}
      />
    </Card>
  );
};
