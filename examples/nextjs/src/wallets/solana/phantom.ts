import { createWallet } from '@web3-wallet/react-solana';
import { PhantomConnector } from '@web3-wallet/solana-phantom';

export const phantom = createWallet<PhantomConnector>(
  (actions) => new PhantomConnector(actions),
);
