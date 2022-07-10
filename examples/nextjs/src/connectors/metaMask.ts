import { MetaMask } from '@vvswallet/metamask';
import { createWallet } from '@vvswallet/react';

export const metaMask = createWallet<MetaMask>(
  (actions) => new MetaMask({ actions }),
);
