import { CryptocomDesktopWallet } from '@web3-wallet/cryptocom-desktop-wallet';
import { createWallet } from '@web3-wallet/react';

export const cryptocomDesktopWallet = createWallet<CryptocomDesktopWallet>(
  (actions) => new CryptocomDesktopWallet({ actions }),
);
