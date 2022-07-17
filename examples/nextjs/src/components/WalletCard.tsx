import { type Wallet, CoinbaseWalletConnector } from '@web3-wallet/ethereum';
import { useEffect } from 'react';

import { Accounts } from './Accounts';
import { Chain } from './Chain';
import { ConnectWithSelect } from './ConnectWithSelect';
import { Status } from './Status';

interface Props {
  name: string;
  wallet: Wallet;
}

export const WalletCard = ({ name, wallet }: Props) => {
  const { hooks, connector } = wallet;
  const {
    useChainId,
    useAccounts,
    useIsActivating,
    useIsActive,
    useProvider,
    useENSNames,
  } = hooks;

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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        justifyContent: 'space-between',
        maxWidth: '30rem',
        minWidth: '15rem',
        padding: '1rem',
        overflow: 'auto',
        border: '1px solid #999',
        borderRadius: '0.5rem',
      }}
    >
      <b>{name}</b>
      <Status isActivating={isActivating} isActive={isActive} />
      <Chain chainId={chainId} />
      <Accounts accounts={accounts} provider={provider} ENSNames={ENSNames} />
      <ConnectWithSelect
        connector={connector}
        chainId={chainId}
        isActivating={isActivating}
        isActive={isActive}
      />
    </div>
  );
};
