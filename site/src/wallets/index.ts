import { createSelectedWallet } from '@web3-wallet/react';

import { coinbaseWallet } from './coinbaseWallet';
import { cryptocomDesktopWallet } from './CryptocomDesktopWallet';
import { defiWallet } from './defiWallet';
import { metaMask } from './metaMask';
import { walletConnect } from './walletConnect';

export {
  coinbaseWallet,
  cryptocomDesktopWallet,
  defiWallet,
  metaMask,
  walletConnect,
};

export const allWallets = [
  metaMask,
  defiWallet,
  coinbaseWallet,
  walletConnect,
  cryptocomDesktopWallet,
];

export const { setSelectedWallet, useSelectedWallet, useIsDisconnected } =
  createSelectedWallet(allWallets);
