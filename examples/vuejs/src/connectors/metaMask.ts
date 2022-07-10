import { MetaMask } from '@vvswallet/metamask';
import { createWallet } from '@vvswallet/vue';

export const metaMask = createWallet<MetaMask>(
  (actions) => new MetaMask({ actions }),
);
