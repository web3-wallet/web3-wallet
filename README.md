# Web3 Wallet

[![CI](https://github.com/LoganAtCrypto/web3-wallet/actions/workflows/ci.yml/badge.svg)](https://github.com/LoganAtCrypto/web3-wallet/actions/workflows/ci.yml)

<p align="center">
  <img width="200" src="site/public/logo.svg?v=2" alt="web3 wallet logo" />
</p>

## Examples

<a href="https://web3-wallet.github.io/web3-wallet" target="_blank">https://web3-wallet.github.io/web3-wallet</a>

## Install

```
# React
pnpm add @web3-wallet/react @web3-wallet/metamask

# Vue
pnpm add @web3-wallet/vue @web3-wallet/metamask
```

## Packages

| Package                                | Version                                                                                                            | Description                   |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------- |
| [`@web3-wallet/react`](packages/react) | [![npm version](https://badge.fury.io/js/@web3-wallet%2Freact.svg)](https://badge.fury.io/js/@web3-wallet%2Freact) | React binding for EVM wallets |
| [`@web3-wallet/vue`](packages/vue)     | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fvue.svg)](https://badge.fury.io/js/@web3-wallet%2Fvue)     | Vue binding for EVM wallets   |

## Wallets

| Package                                                            | Version                                                                                                                                | Description                      |
| ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| [`@web3-wallet/injected`](packages/wallets/injected)               | [![npm version](https://badge.fury.io/js/@web3-wallet%2Finjected.svg)](https://badge.fury.io/js/@web3-wallet%2Finjected)               | Abstract injected connector      |
| [`@web3-wallet/metamask`](packages/wallets/metamask)               | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fmetamask.svg)](https://badge.fury.io/js/@web3-wallet%2Fmetamask)               | Metamask connector               |
| [`@web3-wallet/defiwallet`](packages/wallets/defiwallet)           | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fdefiwallet.svg)](https://badge.fury.io/js/@web3-wallet%2Fdefiwallet)           | Crypto.com DeFi Wallet connector |
| [`@web3-wallet/coinbase-wallet`](packages/wallets/coinbase-wallet) | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fcoinbase-wallet.svg)](https://badge.fury.io/js/@web3-wallet%2Fcoinbase-wallet) | Coinbase wallet connector        |
| [`@web3-wallet/walletconnect`](packages/wallets/walletconnect)     | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fwalletconnect.svg)](https://badge.fury.io/js/@web3-wallet%2Fwalletconnect)     | Walletconnect connector          |

## Getting started

### React

```bash
pnpm add @web3-wallet/react @web3-wallet/metamask
```

```typescript
// wallets/metaMask.ts
import { MetaMaskConnector } from '@web3-wallet/metamask';
import { createWallet } from '@web3-wallet/react';

export const metaMask = createWallet<MetaMaskConnector>(
  (actions) => new MetaMaskConnector(actions),
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
    useEnsName,
  },
} = metaMask;

export const MetaMaskCard = () => {
  const chainId = useChainId();
  const account = useAccount();
  const isActivating = useIsActivating();

  const isActive = useIsActive();

  const provider = useProvider();
  const ensNames = useEnsNames(provider);

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
      ensName={ensName}
    />
  );
};
```

### vue

```bash
pnpm add @web3-wallet/vue @web3-wallet/metamask
```

```typescript
// wallets/metaMask.ts
import { MetaMaskConnector } from '@web3-wallet/core';
import { createWallet } from '@web3-wallet/vue';

export const metaMask = createWallet<MetaMaskConnector>(
  (actions) => new MetaMaskConnector(actions),
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
    ensNames="{ensNames}"
  />
</template>

<script setup lang="ts">
import { onMounted, defineComponent } from 'vue';
import { metaMask } from 'wallets/metaMask';
import { WalletCard } from './WalletCard.vue';

const {
  connector,
  chainId,
  account,
  isActivating,
  isActive,
  useProvider,
  useEnsName,
} = metaMask;

const provider = useProvider();
const ensNName = useEnsName(provider);

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

## More wallets

If the wallet you want integrate with is not included in the @web3-wallet packages set, you can create a wallet connector with few lines of code by extending the `InjectedConnector`.

```typescript
// Trust Wallet connector
import type {
  type Connector,
  type WalletName,
  createWallet,
} from '@web3-wallet/react';
// Or if you are using vue
// import type { type Connector, type WalletName, createWallet } from '@web3-wallet/vue';

import {
  type InjectedProvider,
  InjectedConnector,
} from '@web3-wallet/injected';

export const walletName = 'Trust' as WalletName<'Trust'>;

export type TrustWalletProvider = InjectedProvider & {
  isTrust?: boolean;
};

const providerFilter = (p: TrustWalletProvider) => p.isTrust;

export class TrustWalletConnector extends InjectedConnector {
  constructor(actions: Connector['actions'], onError?: Connector['onError']) {
    super(walletName, actions, onError);
  }

  public override async detectProvider(): Promise<TrustWalletProvider> {
    return await super.detectProvider(providerFilter);
  }
}

const trustWallet = createWallet(
  (actions) => new TrustWalletConnector(actions),
);
```

If the wallet you want to integrate with is not eip1193 compatible or has special provider detection logic, you can extend the `Connector` instead and then implement the `detectProvider` method and override few of the connector methods.

```typescript
import type {
  type Connector,
  type WalletName,
  createWallet,
} from '@web3-wallet/react';

type MyWalletProvider = Provider & {
  // wallet provider props
};
export const walletName = 'MyWallet' as WalletName<'MyWallet'>;

export class MyWalletConnector extends Connector {
  constructor(actions: Connector['actions'], onError?: Connector['onError']) {
    super(walletName, actions, onError);
  }

  public async detectProvider(): Promise<MyWalletProvider> {
    // ...
  }

  protected override switchChain(...args) {
    // ...
  }
}
```

## Development

- node@18.x
- pnpm@7.x

```bash
# clone the repository
git clone git@github.com:web3-wallet/web3-wallet.git

# install dependencies
cd web3-wallet && pnpm install

# react
# the web3-wallet site is built with react
pnpm example-react
# optional
pnpm watch # watch for packages change

# vue
pnpm example-vue # start packages/examples/vue
# optional
pnpm watch # watch for packages change

# test
pnpm test
```

## License

MIT
