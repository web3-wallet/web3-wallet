import { glow, phantom } from '../wallets/solana';
import { SolanaWalletCard } from './SolanaWalletCard';

export const SolanaWalletCardList = () => {
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
      <SolanaWalletCard wallet={phantom} name="Phantom" />
      <SolanaWalletCard wallet={glow} name="Glow" />
    </div>
  );
};
