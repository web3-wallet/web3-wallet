import {
  coinbaseWallet,
  defiWallet,
  metaMask,
  walletConnect,
} from '@nextjs/wallets';

import { WalletCard } from '../components/WalletCard';

export const WalletCardList = () => {
  return (
    <>
      <WalletCard wallet={metaMask} name="MetaMask" />
      <WalletCard wallet={defiWallet} name="crypto.com DeFi Wallet" />
      <WalletCard wallet={coinbaseWallet} name="Coinbase Wallet" />
      <WalletCard wallet={walletConnect} name="WalletConnect" />
    </>
  );
};
