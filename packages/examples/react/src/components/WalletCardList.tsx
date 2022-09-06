import { allWallets } from '@example-react/wallets';

import { NoSSR } from './NoSSR';
import { WalletCard } from './WalletCard';
import { WalletSelectCard } from './WalletSelectCard';

export const WalletCardList = () => {
  return (
    <NoSSR>
      <WalletSelectCard />
      {allWallets.map((wallet) => (
        <WalletCard
          key={wallet.name}
          {...{
            name: wallet.name,

            connect: wallet.connector.connect.bind(wallet.connector),
            disconnect: wallet.connector.disconnect.bind(wallet.connector),
            autoConnectOnce: wallet.connector.autoConnectOnce.bind(
              wallet.connector,
            ),

            ...wallet.hooks,
          }}
        />
      ))}
    </NoSSR>
  );
};
