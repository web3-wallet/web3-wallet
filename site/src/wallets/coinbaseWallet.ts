import { rpcMap } from '@site/chains';
import { CoinbaseWalletConnector } from '@web3-wallet/coinbase-wallet';
import { createWallet } from '@web3-wallet/react';

export const coinbaseWallet = createWallet<CoinbaseWalletConnector>(
  (actions) =>
    new CoinbaseWalletConnector(actions, {
      appName: '@web3-wallet example',
      reloadOnDisconnect: false,
      url: rpcMap[1],
    }),
);
