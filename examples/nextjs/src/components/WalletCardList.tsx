import {
  coinbaseWallet,
  defiWallet,
  metaMask,
  walletConnect,
} from '@nextjs/wallets';

import { WalletCard } from '../components/WalletCard';
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
