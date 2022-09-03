import { URLS } from '@nextjs/chains';
import { createWallet } from '@web3-wallet/react';
import { WalletConnectConnector } from '@web3-wallet/walletconnect';

export const walletConnect = createWallet<WalletConnectConnector>(
  (actions) =>
    new WalletConnectConnector({
      actions,
      options: {
        rpc: URLS,
      },
    }),
);
