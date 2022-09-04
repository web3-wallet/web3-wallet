import { getDeFiWallet } from '@web3-wallet/defiwallet';
import { createWallet } from '@web3-wallet/react';

export const defiWallet = createWallet<ReturnType<typeof getDeFiWallet>>(
  (actions) =>
    getDeFiWallet(actions, {
      extension: {
        chainType: 'eth',
        appName: '@web3-wallet example',
        chainId: 1,
        rpcUrls: {},
      },
    }),
);