# Trust Wallet

## Install

```bash
pnpm add @web3-wallet/trust-wallet
```

## Usage

```ts
import { TrustWallet } from '@web3-wallet/trust-wallet';
import { createWallet } from '@web3-wallet/react';

const wallet = createWallet(new TrustWallet({}));
```

See also: https://developer.trustwallet.com/wallet-connect
