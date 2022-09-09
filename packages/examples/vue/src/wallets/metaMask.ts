import { MetaMask } from '@web3-wallet/metamask';
import { createWallet } from '@web3-wallet/vue';

export const metaMask = createWallet(new MetaMask());
