# Web3 Wallet

[![CI](https://github.com/LoganAtCrypto/web3-wallet/actions/workflows/ci.yml/badge.svg)](https://github.com/LoganAtCrypto/web3-wallet/actions/workflows/ci.yml)

## Install

```
# React
pnpm install @web3-wallet/react @web3-wallet/metamask

# Vue
# pnpm install @web3-wallet/vue @web3-wallet/metamask
```

## Packages

| Package                                                      | Version                                                                                                                                |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Frameworks**                                               |                                                                                                                                        |
| [`@web3-wallet/react`](frameworks/react)                     | [![npm version](https://badge.fury.io/js/@web3-wallet%2Freact.svg)](https://badge.fury.io/js/@web3-wallet%2Freact)                     |
| [`@web3-wallet/vue`](frameworks/vue)                         | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fvue.svg)](https://badge.fury.io/js/@web3-wallet%2Fvue)                         |
| **Core**                                                     |                                                                                                                                        |
| [`@web3-wallet/types`](packages/types)                       | [![npm version](https://badge.fury.io/js/@web3-wallet%2Ftypes.svg)](https://badge.fury.io/js/@web3-wallet%2Ftypes)                     |
| [`@web3-wallet/store`](packages/store)                       | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fstore.svg)](https://badge.fury.io/js/@web3-wallet%2Fstore)                     |
| [`@web3-wallet/utils`](packages/utils)                       | [![npm version](https://badge.fury.io/js/@web3-wallet%2Futils.svg)](https://badge.fury.io/js/@web3-wallet%2Futils)                     |
| **Connectors**                                               |                                                                                                                                        |
| [`@web3-wallet/eip1193`](connectors/eip1193)                 | [![npm version](https://badge.fury.io/js/@web3-wallet%2Feip1193.svg)](https://badge.fury.io/js/@web3-wallet%2Feip1193)                 |
| [`@web3-wallet/metamask`](connectors/metamask)               | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fmetamask.svg)](https://badge.fury.io/js/@web3-wallet%2Fmetamask)               |
| [`@web3-wallet/walletconnect`](connectors/walletconnect)     | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fwalletconnect.svg)](https://badge.fury.io/js/@web3-wallet%2Fwalletconnect)     |
| [`@web3-wallet/coinbase-wallet`](connectors/coinbase-wallet) | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fcoinbase-wallet.svg)](https://badge.fury.io/js/@web3-wallet%2Fcoinbase-wallet) |

## Examples

- [examples/nextjs](examples/nextjs)
- [examples/vuejs](examples/vuejs)

```base
# install dependencies
pnpm install

# nextjs example
# pnpm nextjs

# vuejs example
pnpm vuejs
```

## Basic usage

### React

```bash
pnpm install @web3-wallet/react @web3-wallet/metamask
```

```typescript
// wallets/metaMask.ts
import { MetaMask } from '@web3-wallet/metamask';
import { createWallet } from '@web3-wallet/react';

export const metaMask = createWallet<MetaMask>(
  (actions) => new MetaMask({ actions }),
);
```

```tsx
// WalletCards/MetaMaskCard.tsx
import { useEffect, useState } from 'react';
import { metaMask } from 'wallets/metaMask';
import { Card } from '../Card';

const {
  connector,
  hooks: {
    useChainId,
    useAccount,
    useIsActivating,
    useIsActive,
    useProvider,
    useENSName,
  },
} = metaMask;

export const MetaMaskCard = () => {
  const chainId = useChainId();
  const account = useAccount();
  const isActivating = useIsActivating();

  const isActive = useIsActive();

  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  // attempt to connect eagerly on mount
  useEffect(() => {
    connector.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly to metamask');
    });
  }, []);

  return (
    <WalletCard
      name="MetaMask"
      connector={connector}
      chainId={chainId}
      isActivating={isActivating}
      isActive={isActive}
      account={account}
      provider={provider}
      ENSName={ENSName}
    />
  );
};
```

### vue

```bash
pnpm install @web3-wallet/vue @web3-wallet/metamask
```

```typescript
// wallets/metaMask.ts
import { MetaMask } from '@web3-wallet/metamask';
import { createWallet } from '@web3-wallet/react';

export const metaMask = createWallet<MetaMask>(
  (actions) => new MetaMask({ actions }),
);
```

```vue
// WalletCards/MetaMaskCard.vue
<template>
  <WalletCard
    name="MetaMask"
    connector="{connector}"
    chainId="{chainId}"
    isActivating="{isActivating}"
    isActive="{isActive}"
    account="{account}"
    provider="{provider}"
    ENSNames="{ENSNames}"
  />
</template>

<script setup lang="ts">
import { onMounted, defineComponent } from 'vue';
import { metaMask } from 'wallets/metaMask';
import { WalletCard } from './WalletCard.vue';

const {
  connector,
  hooks: {
    useChainId,
    useAccount,
    useIsActivating,
    useIsActive,
    useProvider,
    useENSName,
  },
} = metaMask;

const chainId = useChainId();
const account = useAccount();
const isActivating = useIsActivating();
const isActive = useIsActive();
const provider = useProvider();
const ENSName = useENSName(provider);

// attempt to connect eagerly on mount
onMounted(() => {
  connector.connectEagerly().catch(() => {
    console.debug('Failed to connect eagerly to metamask');
  });
});

defineComponent({
  name: 'MetaMaskCard',
  components: {
    WalletCard,
  },
});
</script>
```

## Develop

- node@16.14.x
- pnpm@7.5.x

```bash
# clone the repository
git clone git@github.com:LoganAtCrypto/web3-wallet.git

# install dependencies
cd web3-wallet && pnpm install

# react
pnpm watch && pnpm nextjs

# vue
pnpm watch && pnpm vuejs # vue
```
