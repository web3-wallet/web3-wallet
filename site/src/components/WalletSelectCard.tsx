import { HStack, Image, Text } from '@chakra-ui/react';
import { allWallets, currentWallet, walletIconMap } from '@site/wallets';
import { BalancePlugin } from '@web3-wallet/plugin-balance-react';
import { EnsPlugin } from '@web3-wallet/plugin-ens-react';
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
} = currentWallet;

export const WalletSelectCard = () => {
  const walletName = useName();
  const isConnecting = useIsConnecting();
  const isConnected = useIsConnected();

  const chainId = useChainId();
  const accounts = useAccounts();

  const { useBalances } = usePlugin<BalancePlugin.Api>(
    BalancePlugin.name,
  ).hooks;
  const { useEnsNames } = usePlugin<EnsPlugin.Api>(EnsPlugin.name).hooks;

  const balances = useBalances();
  const ensNames = useEnsNames();

  useEffect(() => {
    autoConnectOnce();
    /**
     * autoConnectOnce per wallet
     */
  }, [walletName]);

  return (
    <NoSSR>
      <WalletCard minW="280px" maxW="420px" width="100%">
        <WalletSelect
          wallets={allWallets}
          currentWalletName={walletName}
          switchCurrentWallet={switchCurrentWallet}
        />
        <WalletCard>
          <HStack>
            <Image
              width="24px"
              src={walletIconMap[walletName]}
              alt="MetaMask logo"
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
