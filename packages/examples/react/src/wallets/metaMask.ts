import { MetaMask } from '@web3-wallet/metamask';
import { createWallet } from '@web3-wallet/react';

export const metaMask = createWallet<MetaMask>(
  (actions) => new MetaMask({ actions }),
);
