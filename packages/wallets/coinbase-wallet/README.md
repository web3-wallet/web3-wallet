# Coinbase Wallet

## Install

```bash
pnpm add @react-web3-wallet/coinbase-wallet @coinbase/wallet-sdk
```

## Usage

```ts
import CoinbaseWallet from '@react-web3-wallet/coinbase-wallet';
import { createWallet } from '@react-web3-wallet/react';

const wallet = createWallet(
  new CoinbaseWallet({
    providerOptions: {
      appName: 'My App',
      scanToConnectOptions: {
        rpcUrl: 'xxx',
        chainId: 1,
      },
    },
  }),
);
```

See also: https://docs.cloud.coinbase.com/wallet-sdk/docs/installing
