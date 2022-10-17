# Coinbase Wallet

## Install

```bash
pnpm add @web3-wallet/coinbase-wallet @coinbase/wallet-sdk
```

## Usage

```ts
import CoinbaseWallet from '@web3-wallet/coinbase-wallet';
import { createWallet } from '@web3-wallet/react';

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
