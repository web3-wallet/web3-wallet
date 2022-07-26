import { WalletCard } from '../components/WalletCard';
import { coinbaseWallet, defiWallet, metaMask } from '../wallets/ethereum';

export const WalletCardList = () => {
  return (
    <>
      <WalletCard wallet={metaMask} name="MetaMask" />
      <WalletCard wallet={defiWallet} name="crypto.com DeFi Wallet" />
      <WalletCard wallet={coinbaseWallet} name="Coinbase Wallet" />
    </>
  );
};
