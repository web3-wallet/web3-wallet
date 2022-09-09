import { Text } from '@chakra-ui/react';
import { currentWallet } from '@site/wallets';
import { useEffect } from 'react';

import { Accounts } from './Accounts';
import { Chain } from './Chain';
import { ConnectWithSelect } from './ConnectWithSelect';
import { NoSSR } from './NoSSR';
import { WalletCard } from './WalletCard';
import { WalletSelect } from './WalletSelect';
import { WalletStatus } from './WalletStatus';

const {
  wallets,
  setCurrentWallet,
  useName,

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

  useEffect(() => {
    autoConnectOnce();
    /**
     * autoConnect per wallet
     */
  }, [walletName]);

  return (
    <NoSSR>
      <WalletCard
        style={{ minWidth: '280px', maxWidth: '420px', width: '100%' }}
      >
        <WalletSelect
          wallets={wallets}
          selectedWalletName={walletName}
          setSelectedWallet={setCurrentWallet}
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
