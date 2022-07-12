import { WalletCard } from '../components/WalletCard';
import { coinbaseWallet, metaMask } from '../wallets';

export default function Home() {
  return (
    <>
      <WalletCard wallet={metaMask} name="MetaMask" />
      <WalletCard wallet={coinbaseWallet} name="Coinbase Wallet" />
    </>
  );
}
