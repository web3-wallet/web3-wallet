import { allWallets } from '@example-react/wallets';

import { WalletCard } from './WalletCard';
import { WalletSelectCard } from './WalletSelectCard';

export const WalletCardList = () => {
  return (
    <>
      <WalletSelectCard />
      {allWallets.map((wallet) => (
        <WalletCard key={wallet.name} wallet={wallet} />
      ))}
    </>
  );
};
