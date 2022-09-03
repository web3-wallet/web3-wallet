import { MetaMaskConnector } from '@web3-wallet/metamask';
import { createWallet } from '@web3-wallet/vue';

export const metaMask = createWallet<MetaMaskConnector>(
  (actions) => new MetaMaskConnector(actions),
);
