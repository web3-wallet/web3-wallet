# Walletconnect

## Install

```bash
pnpm add @web3-wallet/walletconnect @walletconnect/ethereum-provider
```

## Usage

```ts
import { Walletconnect } from '@web3-wallet/walletconnect';
import { createWallet } from '@web3-wallet/react';

const wallet = createWallet(
  new Walletconnect({
    providerOptions: {
      // Record<chainId, rpcUrl>
      rpc: {},
    },
  }),
);
```

See also: https://docs.walletconnect.com/quick-start/dapps/web3-provider
