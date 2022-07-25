import { createWallet } from '@web3-wallet/react-solana';
import { GlowConnector } from '@web3-wallet/solana-glow';

export const glow = createWallet<GlowConnector>(
  (actions) => new GlowConnector(actions),
);
