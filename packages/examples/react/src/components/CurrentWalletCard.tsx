import { getNetwork } from '@example-react/chains';
import {
  currentWallet,
  getWalletConfig,
  walletConfigs,
} from '@example-react/wallets';
import Image from 'next/image';
import { useEffect } from 'react';

import { Accounts } from './Accounts';
import { Box } from './Box';
import { Card } from './Card';
import { Chain } from './Chain';
import { ConnectWithSelect } from './ConnectWithSelect';
import { NoSSR } from './NoSSR';
import { Status } from './Status';
import { WalletSelect } from './WalletSelect';

const {
  useWalletName,

  connect,
  autoConnect,
  disconnect,

  useIsConnecting,
  useIsConnected,

  useAccounts,
  useChainId,

  useBalances,
  useEnsNames,

  switchCurrentWallet,
} = currentWallet;

export const CurrentWalletCard = () => {
  const walletName = useWalletName();
  const isConnecting = useIsConnecting();
  const isConnected = useIsConnected();

  const chainId = useChainId();
  const accounts = useAccounts();

  const ensNames = useEnsNames(getNetwork(chainId));
  const balances = useBalances();

  useEffect(() => {
    autoConnect();
  }, [walletName]);

  return (
    <NoSSR>
      <Card style={{ minWidth: '280px', maxWidth: '320px', width: '100%' }}>
        <WalletSelect
          walletConfigs={walletConfigs}
          currentWalletName={walletName}
          switchCurrentWallet={switchCurrentWallet}
        />
        <Card>
          <Box style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Image
              width="24px"
              height="24px"
              src={getWalletConfig(walletName).icon}
              alt="Wallet Logo"
            />
            <b>{walletName}</b>
          </Box>
          <Status isConnecting={isConnecting} isConnected={isConnected} />
          <Chain chainId={chainId} />
          <Accounts
            accounts={accounts}
            balances={balances}
            ensNames={ensNames}
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
