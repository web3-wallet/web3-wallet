import {
  coinbaseWallet,
  defiWallet,
  metaMask,
  walletConnect,
} from '@site/wallets';

import { WalletCard } from './WalletCard';
import { WalletSelectCard } from './WalletSelectCard';

export const WalletCardList = () => {
  return (
    <>
      <WalletSelectCard />
      <WalletCard wallet={metaMask} />
      <WalletCard wallet={defiWallet} />
      <WalletCard wallet={walletConnect} />
      <WalletCard wallet={coinbaseWallet} />
    </>
  );
};
