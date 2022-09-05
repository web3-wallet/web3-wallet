import { CryptocomDesktopWalletConnector } from '@web3-wallet/cryptocom-desktop-wallet';
import { createWallet } from '@web3-wallet/react';

export const cryptocomDesktopWallet =
  createWallet<CryptocomDesktopWalletConnector>(
    (actions) => new CryptocomDesktopWalletConnector(actions),
  );
