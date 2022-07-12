import { CoinbaseWallet } from '@web3-wallet/coinbase-wallet';
import { createWallet } from '@web3-wallet/react';

export const coinbaseWallet = createWallet<CoinbaseWallet>(
  (actions) =>
    new CoinbaseWallet({
      actions,
      options: {
        appName: '@web3-wallet example',
        reloadOnDisconnect: false,
      },
    }),
);
