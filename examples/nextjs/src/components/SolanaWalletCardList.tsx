import { glow, phantom } from '../wallets/solana';
import { SolanaWalletCard } from './SolanaWalletCard';

export const SolanaWalletCardList = () => {
  return (
    <>
      <SolanaWalletCard wallet={phantom} name="Phantom" />
      <SolanaWalletCard wallet={glow} name="Glow" />
    </>
  );
};
