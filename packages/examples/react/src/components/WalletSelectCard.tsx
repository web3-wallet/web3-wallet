import { selectedWallet } from '@example-react/wallets';
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
    useConnect,
    useDisconnect,
    useAutoConnectOnce,

    useSelectedWallet,
    setSelectedWallet,

    useAccounts,
    useChainId,
    useENSNames,
    useProvider,
    useIsConnecting,
    useIsConnected,
  } = selectedWallet;

  const wallet = useSelectedWallet();
  const chainId = useChainId();
  const accounts = useAccounts();

  const isConnecting = useIsConnecting();
  const isConnected = useIsConnected();

  const connect = useConnect();
  const autoConnectOnce = useAutoConnectOnce();
  const disconnect = useDisconnect();

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
          selectedWalletName={wallet.name}
          setSelectedWallet={setSelectedWallet}
        />
        <Card>
          <b>{wallet.name}</b>
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
