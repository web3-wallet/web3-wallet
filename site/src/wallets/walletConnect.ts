import { rpcMap } from '@site/chains';
import { createWallet } from '@web3-wallet/react';
import { WalletConnectConnector } from '@web3-wallet/walletconnect';

export const walletConnect = createWallet<WalletConnectConnector>(
  (actions) =>
    new WalletConnectConnector({
      actions,
      options: {
        rpc: rpcMap,
      },
    }),
);
