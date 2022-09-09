import { rpcMap } from '@site/chains';
import { CoinbaseWallet } from '@web3-wallet/coinbase-wallet';
import { createWallet } from '@web3-wallet/react';

export const coinbaseWallet = createWallet<CoinbaseWallet>(
  new CoinbaseWallet({
    providerOptions: {
      appName: '@web3-wallet example',
      reloadOnDisconnect: false,
      url: rpcMap[1],
    },
  }),
);
