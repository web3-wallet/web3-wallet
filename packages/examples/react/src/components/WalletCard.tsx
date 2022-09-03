import type { Wallet } from '@web3-wallet/react';
import { useEffect } from 'react';

import { Accounts } from './Accounts';
import { Card } from './Card';
import { Chain } from './Chain';
import { ConnectWithSelect } from './ConnectWithSelect';
import { Status } from './Status';

interface Props {
  wallet: Wallet;
}

export const WalletCard = ({ wallet }: Props) => {
  const {
    connector,
    hooks: {
      useChainId,
      useAccounts,
      useIsActivating,
      useIsActive,
      useProvider,
      useENSNames,
    },
  } = wallet;

  const chainId = useChainId();
  const accounts = useAccounts();
  const isActivating = useIsActivating();

  const isActive = useIsActive();

  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  // attempt to connect eagerly on mount
  useEffect(() => {
    connector.connectEagerly()?.catch((e) => {
      console.debug('Failed to connect eagerly', e);
    });
  }, [connector]);

  return (
    <Card>
      <b>{wallet.name}</b>
      <div>Category: Ethereum</div>
      <Status isActivating={isActivating} isActive={isActive} />
      <Chain chainId={chainId} />
      <Accounts accounts={accounts} provider={provider} ENSNames={ENSNames} />
      <ConnectWithSelect
        connector={connector}
        chainId={chainId}
        isActivating={isActivating}
        isActive={isActive}
      />
    </Card>
  );
};
