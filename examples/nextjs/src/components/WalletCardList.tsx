import { WalletCard } from '../components/WalletCard';
import { coinbaseWallet, defiWallet, metaMask } from '../wallets/ethereum';

export const WalletCardList = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        flexWrap: 'wrap',
        gap: '1.5rem',
        margin: '2rem 0',
      }}
    >
      <WalletCard wallet={metaMask} name="MetaMask" />
      <WalletCard wallet={defiWallet} name="crypto.com DeFi Wallet" />
      <WalletCard wallet={coinbaseWallet} name="Coinbase Wallet" />
    </div>
  );
};
