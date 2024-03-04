# Trust Wallet

## Install

```bash
pnpm add @react-web3-wallet/trust-wallet
```

## Usage

```ts
import { TrustWallet } from '@react-web3-wallet/trust-wallet';
import { createWallet } from '@react-web3-wallet/react';

const wallet = createWallet(new TrustWallet({}));
```

See also: https://developer.trustwallet.com/wallet-connect
