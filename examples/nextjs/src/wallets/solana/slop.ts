import { createWallet } from '@web3-wallet/react-solana';
import { SlopConnector } from '@web3-wallet/solana-slop';

export const slop = createWallet<SlopConnector>(
  (actions) => new SlopConnector(actions),
);
