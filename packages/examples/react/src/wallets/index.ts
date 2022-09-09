import { createCurrentWallet } from '@web3-wallet/react';

import { coinbaseWallet } from './coinbaseWallet';
import { cryptocomDesktopWallet } from './CryptocomDesktopWallet';
import { defiWallet } from './defiWallet';
import { metaMask } from './metaMask';
import { walletConnect } from './walletConnect';

export const walletProxy = createCurrentWallet([
  metaMask,
  defiWallet,
  coinbaseWallet,
  walletConnect,
  cryptocomDesktopWallet,
]);
