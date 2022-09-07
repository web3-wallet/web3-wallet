import { rpcMap } from '@example-react/chains';
import { CoinbaseWallet } from '@web3-wallet/coinbase-wallet';
import { createWallet } from '@web3-wallet/react';

export const coinbaseWallet = createWallet<CoinbaseWallet>(
  (actions) =>
    new CoinbaseWallet(actions, {
      appName: '@web3-wallet example',
      reloadOnDisconnect: false,
      url: rpcMap[1],
    }),
);
