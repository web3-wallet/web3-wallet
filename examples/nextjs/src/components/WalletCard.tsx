import { CoinbaseWalletConnector } from '@web3-wallet/coinbase-wallet';
import type { Wallet } from '@web3-wallet/react';
import { useEffect } from 'react';

import { Accounts } from './Accounts';
import { Chain } from './Chain';
import { ConnectWithSelect } from './ConnectWithSelect';
import { Status } from './Status';
import { WalletCardContainer } from './WalletCardContainer';

interface Props {
  name: string;
  wallet: Wallet;
}

export const WalletCard = ({ name, wallet }: Props) => {
  const {
    connector,
    useChainId,
    useAccounts,
    useIsActivating,
    useIsActive,
    useProvider,
    useENSNames,
  } = wallet;

  const chainId = useChainId();
  const accounts = useAccounts();
  const isActivating = useIsActivating();

  const isActive = useIsActive();

  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  // attempt to connect eagerly on mount
  useEffect(() => {
    if (connector instanceof CoinbaseWalletConnector) return;

    connector.connectEagerly()?.catch((e) => {
      console.debug('Failed to connect eagerly', e);
    });
  }, []);

  return (
    <WalletCardContainer>
      <b>{name}</b>
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
    </WalletCardContainer>
  );
};
