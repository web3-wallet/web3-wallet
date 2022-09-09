import { rpcMap } from '@example-react/chains';
import { createWallet } from '@web3-wallet/react';
import { WalletConnect } from '@web3-wallet/walletconnect';

export const walletConnect = createWallet(
  new WalletConnect({
    providerOptions: {
      rpc: rpcMap,
    },
  }),
);
