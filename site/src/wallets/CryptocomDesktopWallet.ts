import { CryptocomDesktopWalletConnector } from '@site/connectors';
import { createWallet } from '@web3-wallet/react';

export const cryptocomDesktopWallet =
  createWallet<CryptocomDesktopWalletConnector>(
    (actions) => new CryptocomDesktopWalletConnector(actions),
  );
