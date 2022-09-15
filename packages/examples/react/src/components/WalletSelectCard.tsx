import { allWallets, currentWallet } from '@example-react/wallets';
import { BalancePlugin } from '@web3-wallet/plugin-balance-react';
import { EnsPlugin } from '@web3-wallet/plugin-ens-react';
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
    getPlugin,

    switchCurrentWallet,

    connect,
    autoConnectOnce,
    disconnect,

    useIsConnecting,
    useIsConnected,

    useAccounts,
    useChainId,
  } = currentWallet;

  const walletName = useName();

  const isConnecting = useIsConnecting();
  const isConnected = useIsConnected();

  const chainId = useChainId();
  const accounts = useAccounts();

  const { useEnsNames } = getPlugin<EnsPlugin.Api>(EnsPlugin.name).hooks;
  const { useBalances } = getPlugin<BalancePlugin.Api>(
    BalancePlugin.name,
  ).hooks;

  const balances = useBalances();
  const ensNames = useEnsNames();

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
