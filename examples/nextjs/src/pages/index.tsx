import { WalletCard } from '../components/WalletCard';
import { coinbaseWallet, defiWallet, metaMask } from '../wallets';

export default function Home() {
  return (
    <>
      <WalletCard wallet={metaMask} name="MetaMask" />
      <WalletCard wallet={defiWallet} name="crypto.com DeFi Wallet" />
      <WalletCard wallet={coinbaseWallet} name="Coinbase Wallet" />
    </>
  );
}
