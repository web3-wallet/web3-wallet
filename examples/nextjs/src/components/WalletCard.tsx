import type { WalletApi } from '@web3-wallet/react';
import { useEffect } from 'react';

import { Accounts } from './Accounts';
import { Chain } from './Chain';
import { ConnectWithSelect } from './ConnectWithSelect';
import { Status } from './Status';

interface Props {
  name: string;
  wallet: WalletApi;
}

export function WalletCard({ name, wallet }: Props) {
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
    (connector.connectEagerly() as Promise<void>).catch((e) => {
      console.debug('Failed to connect eagerly');
    });
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '20rem',
        padding: '1rem',
        margin: '1rem',
        overflow: 'auto',
        border: '1px solid',
        borderRadius: '1rem',
      }}
    >
      <b>{name}</b>
      <div style={{ marginBottom: '1rem' }}>
        <Status isActivating={isActivating} isActive={isActive} />
      </div>
      <Chain chainId={chainId} />
      <div style={{ marginBottom: '1rem' }}>
        <Accounts accounts={accounts} provider={provider} ENSNames={ENSNames} />
      </div>
      <ConnectWithSelect
        connector={connector}
        chainId={chainId}
        isActivating={isActivating}
        isActive={isActive}
      />
    </div>
  );
}
