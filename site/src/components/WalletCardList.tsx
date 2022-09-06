import { allWallets } from '@site/wallets';

import { NoSSR } from './NoSSR';
import { WalletCard } from './WalletCard';
import { WalletSelectCard } from './WalletSelectCard';

export const WalletCardList = () => {
  return (
    <NoSSR>
      <WalletSelectCard />
      {allWallets.map((wallet) => (
        <WalletCard key={wallet.name} wallet={wallet} />
      ))}
    </NoSSR>
  );
};
