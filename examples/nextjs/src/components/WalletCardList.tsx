import { coinbaseWallet, defiWallet, metaMask } from '@nextjs/wallets';

import { WalletCard } from '../components/WalletCard';

export const WalletCardList = () => {
  return (
    <>
      <WalletCard wallet={metaMask} name="MetaMask" />
      <WalletCard wallet={defiWallet} name="crypto.com DeFi Wallet" />
      <WalletCard wallet={coinbaseWallet} name="Coinbase Wallet" />
    </>
  );
};
