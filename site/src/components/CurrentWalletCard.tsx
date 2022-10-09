import { HStack, Image, Text } from '@chakra-ui/react';
import { getNetwork } from '@site/chains';
import { currentWallet, getWalletConfig, walletConfigs } from '@site/wallets';
import { BalancePlugin } from '@web3-wallet/plugin-balance';
import { EnsPlugin } from '@web3-wallet/plugin-ens';
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

  getPluginApi,

  connect,
  autoConnect,
  disconnect,

  useIsConnecting,
  useIsConnected,

  switchCurrentWallet,

  useAccounts,
  useChainId,
  useProvider,
} = currentWallet;

export const CurrentWalletCard = () => {
  const walletName = useName();
  const isConnecting = useIsConnecting();
  const isConnected = useIsConnected();

  const chainId = useChainId();
  const accounts = useAccounts();

  const { useBalances } = getPluginApi<BalancePlugin.Api>(BalancePlugin.name);
  const { useEnsNames } = getPluginApi<EnsPlugin.Api>(EnsPlugin.name);

  const ensNames = useEnsNames([getNetwork(chainId)]);

  const balances = useBalances();

  useEffect(() => {
    autoConnect();
  }, [walletName]);

  return (
    <NoSSR>
      <WalletCard minW="280px" maxW="420px" width="100%">
        <WalletSelect
          walletConfigs={walletConfigs}
          currentWalletName={walletName}
          switchCurrentWallet={switchCurrentWallet}
        />
        <WalletCard>
          <HStack>
            <Image
              width="24px"
              src={getWalletConfig(walletName).icon}
              alt="Wallet Logo"
            />
            <Text fontWeight="bold">{walletName}</Text>
          </HStack>
          <WalletStatus isConnecting={isConnecting} isConnected={isConnected} />
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
        </WalletCard>
      </WalletCard>
    </NoSSR>
  );
};
