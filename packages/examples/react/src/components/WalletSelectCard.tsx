import { allWallets, currentWallet } from '@example-react/wallets';
import { useEffect } from 'react';

import { Accounts } from './Accounts';
import { Card } from './Card';
import { Chain } from './Chain';
import { ConnectWithSelect } from './ConnectWithSelect';
import { NoSSR } from './NoSSR';
import { Status } from './Status';
import { WalletSelect } from './WalletSelect';

export const WalletSelectCard = () => {
  const {
    useName,

    switchCurrentWallet,

    connect,
    autoConnectOnce,
    disconnect,

    useIsConnecting,
    useIsConnected,

    useAccounts,
    useChainId,
    useENSNames,
    useProvider,
  } = currentWallet;

  const walletName = useName();

  const isConnecting = useIsConnecting();
  const isConnected = useIsConnected();

  const chainId = useChainId();
  const accounts = useAccounts();
  const provider = useProvider();
  const ENSNames = useENSNames();

  useEffect(() => {
    autoConnectOnce();
  }, [autoConnectOnce, walletName]);

  return (
    <NoSSR>
      <Card style={{ minWidth: '280px', maxWidth: '320px', width: '100%' }}>
        <WalletSelect
          wallets={allWallets}
          currentWalletName={walletName}
          switchCurrentWallet={switchCurrentWallet}
        />
        <Card>
          <b>{walletName}</b>
          <Status isConnecting={isConnecting} isConnected={isConnected} />
          <Chain chainId={chainId} />
          <Accounts
            accounts={accounts}
            provider={provider}
            ENSNames={ENSNames}
          />
          <ConnectWithSelect
            connect={connect}
            disconnect={disconnect}
            chainId={chainId}
            isConnecting={isConnecting}
            isConnected={isConnected}
          />
        </Card>
      </Card>
    </NoSSR>
  );
};
