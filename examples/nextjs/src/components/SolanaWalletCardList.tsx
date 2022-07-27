import { glow, phantom, slop } from '../wallets/solana';
import { SolanaWalletCard } from './SolanaWalletCard';

export const SolanaWalletCardList = () => {
  return (
    <>
      <SolanaWalletCard wallet={phantom} name="Phantom" />
      <SolanaWalletCard wallet={glow} name="Glow" />
      <SolanaWalletCard wallet={slop} name="Slop" />
    </>
  );
};
