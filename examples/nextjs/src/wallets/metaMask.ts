import { MetaMaskConnector } from '@web3-wallet/ethereum';
import { createWallet } from '@web3-wallet/react';

export const metaMask = createWallet<MetaMaskConnector>(
  (actions) => new MetaMaskConnector(actions),
);
