import type { Wallet } from '@web3-wallet/react';
import { useEffect } from 'react';

import { Accounts } from './Accounts';
import { Card } from './Card';
import { Chain } from './Chain';
import { ConnectWithSelect } from './ConnectWithSelect';
import { Status } from './Status';

type Props = {
  name: Wallet['name'];
  activate: Wallet['connector']['activate'];
  deactivate: Wallet['connector']['deactivate'];
  connectEagerlyOnce: Wallet['connector']['connectEagerlyOnce'];
} & Wallet['hooks'];

export const WalletCard = ({
  name,

  activate,
  deactivate,
  connectEagerlyOnce,

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
    connectEagerlyOnce()?.catch((e) => {
      console.debug('Failed to connect eagerly', e);
    });
  }, [connectEagerlyOnce]);

  return (
    <Card>
      <b>{name}</b>
      <div>Category: Ethereum</div>
      <Status isActivating={isActivating} isActive={isActive} />
      <Chain chainId={chainId} />
      <Accounts accounts={accounts} provider={provider} ENSNames={ENSNames} />
      <ConnectWithSelect
        activate={activate}
        deactivate={deactivate}
        chainId={chainId}
        isActivating={isActivating}
        isActive={isActive}
      />
    </Card>
  );
};
