import { coinbaseWallet } from './coinbaseWallet';
import { cryptocomDesktopWallet } from './CryptocomDesktopWallet';
import { defiWallet } from './defiWallet';
import { metaMask } from './metaMask';
import { walletConnect } from './walletConnect';

export * from './coinbaseWallet';
export * from './CryptocomDesktopWallet';
export * from './defiWallet';
export * from './metaMask';
export * from './walletConnect';

export const allWallets = [
  metaMask,
  defiWallet,
  coinbaseWallet,
  walletConnect,
  cryptocomDesktopWallet,
];
