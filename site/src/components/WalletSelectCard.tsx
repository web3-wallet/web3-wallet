import { Text } from '@chakra-ui/react';
import { allWallets, currentWallet, metamask } from '@site/wallets';
import { ConnectionStatusPlugin } from '@web3-wallet/plugin-connection-status-react';
import { useEffect } from 'react';

import { Accounts } from './Accounts';
import { Chain } from './Chain';
import { ConnectWithSelect } from './ConnectWithSelect';
import { NoSSR } from './NoSSR';
import { WalletCard } from './WalletCard';
import { WalletSelect } from './WalletSelect';
import { WalletStatus } from './WalletStatus';

const {
  useName,
  switchCurrentWallet,

  usePlugin,

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

export const WalletSelectCard = () => {
  const walletName = useName();
  const isConnecting = useIsConnecting();
  const isConnected = useIsConnected();

  const chainId = useChainId();
  const accounts = useAccounts();
  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  const { useConnectionStatus } = usePlugin<ConnectionStatusPlugin.Api>(
    ConnectionStatusPlugin.name,
  ).api.hooks;

  console.log('useConnectionStatus', useConnectionStatus());
  console.log(metamask.useAccount());

  useEffect(() => {
    autoConnectOnce();
    /**
     * autoConnectOnce per wallet
     */
  }, [walletName]);

  return (
    <NoSSR>
      <WalletCard
        style={{ minWidth: '280px', maxWidth: '420px', width: '100%' }}
      >
        <WalletSelect
          wallets={allWallets}
          currentWalletName={walletName}
          switchCurrentWallet={switchCurrentWallet}
        />
        <WalletCard>
          <Text fontWeight="bold">{walletName}</Text>
          <WalletStatus isConnecting={isConnecting} isConnected={isConnected} />
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
        </WalletCard>
      </WalletCard>
    </NoSSR>
  );
};
