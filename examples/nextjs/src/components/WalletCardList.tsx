import { WalletCard } from '../components/WalletCard';
import { coinbaseWallet, defiWallet, metaMask } from '../wallets';

export const WalletCardList = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      flexWrap: 'wrap',
      gap: '1.5rem',
      margin: '2rem',
    }}
  >
    <WalletCard wallet={metaMask} name="MetaMask" />
    <WalletCard wallet={defiWallet} name="crypto.com DeFi Wallet" />
    <WalletCard wallet={coinbaseWallet} name="Coinbase Wallet" />
  </div>
);
