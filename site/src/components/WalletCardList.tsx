import { allWallets } from '@site/wallets';

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

            activate: wallet.connector.activate.bind(wallet.connector),
            deactivate: wallet.connector.deactivate.bind(wallet.connector),
            connectEagerlyOnce: wallet.connector.connectEagerlyOnce.bind(
              wallet.connector,
            ),

            ...wallet.hooks,
          }}
        />
      ))}
    </NoSSR>
  );
};
