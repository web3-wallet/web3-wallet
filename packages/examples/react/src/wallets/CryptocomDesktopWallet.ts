import { CryptocomDesktopWalletConnector } from '@example-react/connectors';
import { createWallet } from '@web3-wallet/react';

export const cryptocomDesktopWallet =
  createWallet<CryptocomDesktopWalletConnector>(
    (actions) => new CryptocomDesktopWalletConnector(actions),
  );
