import { selectedWallet } from '@example-react/wallets';

import { Card } from './Card';
import { NoSSR } from './NoSSR';
import { WalletCard } from './WalletCard';
import { WalletSelect } from './WalletSelect';

export const WalletSelectCard = () => {
  const {
    useConnect,
    useDisconnect,
    useAutoConnectOnce,

    useSelectedWallet,
    useAccount,
    useAccounts,
    useChainId,
    useENSName,
    useENSNames,
    useProvider,
    useIsConnecting,
    useIsConnected,
  } = selectedWallet;

  return (
    <NoSSR>
      <Card style={{ minWidth: '280px', maxWidth: '320px', width: '100%' }}>
        <WalletSelect />
        <WalletCard
          {...{
            name: useSelectedWallet().name,

            connect: useConnect(),
            disconnect: useDisconnect(),
            autoConnectOnce: useAutoConnectOnce(),

            useAccount,
            useAccounts,
            useChainId,
            useENSName,
            useENSNames,
            useProvider,
            useIsConnecting,
            useIsConnected,
          }}
        />
      </Card>
    </NoSSR>
  );
};
