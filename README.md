# Web3 Wallet

[![CI](https://github.com/LoganAtCrypto/web3-wallet/actions/workflows/ci.yml/badge.svg)](https://github.com/LoganAtCrypto/web3-wallet/actions/workflows/ci.yml)

## Install

```
# React
pnpm install @web3-wallet/react @web3-wallet/ethereum

# Vue
pnpm install @web3-wallet/vue @web3-wallet/ethereum
```

## Packages

| Package                                      | Version                                                                                                                  |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| [`@web3-wallet/react`](packages/react)       | [![npm version](https://badge.fury.io/js/@web3-wallet%2Freact.svg)](https://badge.fury.io/js/@web3-wallet%2Freact)       |
| [`@web3-wallet/vue`](packages/vue)           | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fvue.svg)](https://badge.fury.io/js/@web3-wallet%2Fvue)           |
| [`@web3-wallet/ethereum`](packages/ethereum) | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fethereum.svg)](https://badge.fury.io/js/@web3-wallet%2Fethereum) |
| [`@web3-wallet/types`](packages/types)       | [![npm version](https://badge.fury.io/js/@web3-wallet%2Ftypes.svg)](https://badge.fury.io/js/@web3-wallet%2Ftypes)       |

## Examples

- [examples/nextjs](examples/nextjs)
- [examples/vuejs](examples/vuejs)

```base
# install dependencies
pnpm install

# nextjs example
pnpm nextjs

# vuejs example
pnpm vuejs
```

## Basic usage

### React

```bash
pnpm install @web3-wallet/react @web3-wallet/ethereum
```

```typescript
// wallets/metaMask.ts
import { MetaMaskConnector } from '@web3-wallet/ethereum';
import { createWallet } from '@web3-wallet/react';

export const metaMask = createWallet<MetaMaskConnector>(
  (actions) => new MetaMask(actions),
);
```

```tsx
// WalletCards/MetaMaskCard.tsx
import { useEffect, useState } from 'react';
import { metaMask } from 'wallets/metaMask';
import { WalletCard } from '../WalletCard';

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
pnpm install @web3-wallet/vue @web3-wallet/ethereum
```

```typescript
// wallets/metaMask.ts
import { MetaMaskConnector } from '@web3-wallet/ethereum';
import { createWallet } from '@web3-wallet/react';

export const metaMask = createWallet<MetaMask>(
  (actions) => new MetaMask(actions),
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
pnpm watch && pnpm vuejs

# test
pnpm test
```
