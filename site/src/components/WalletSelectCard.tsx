import { walletProxy } from '@site/wallets';
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
    wallets,
    useCurrentWallet,
    setCurrentWallet,

    useConnect,
    useDisconnect,
    useAutoConnectOnce,

    useIsConnecting,
    useIsConnected,

    useAccounts,
    useChainId,
    useENSNames,
    useProvider,
  } = walletProxy;

  const currentWallet = useCurrentWallet();

  const connect = useConnect();
  const autoConnectOnce = useAutoConnectOnce();
  const disconnect = useDisconnect();

  const isConnecting = useIsConnecting();
  const isConnected = useIsConnected();

  const chainId = useChainId();
  const accounts = useAccounts();
  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  // try to auto connect on mount
  useEffect(() => {
    autoConnectOnce();
  }, [autoConnectOnce]);

  return (
    <NoSSR>
      <Card style={{ minWidth: '280px', maxWidth: '320px', width: '100%' }}>
        <WalletSelect
          wallets={wallets}
          selectedWalletName={currentWallet.name}
          setSelectedWallet={setCurrentWallet}
        />
        <Card>
          <b>{currentWallet.name}</b>
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
