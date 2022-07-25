# Web3 Wallet

[![CI](https://github.com/LoganAtCrypto/web3-wallet/actions/workflows/ci.yml/badge.svg)](https://github.com/LoganAtCrypto/web3-wallet/actions/workflows/ci.yml)

## Install

```
# React
pnpm install @web3-wallet/react @web3-wallet/metamask

# Vue
pnpm install @web3-wallet/vue @web3-wallet/metamask
```

## Packages

| Package                                              | Version                                                                                                                          | Description                      |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| [`@web3-wallet/react`](packages/react)               | [![npm version](https://badge.fury.io/js/@web3-wallet%2Freact.svg)](https://badge.fury.io/js/@web3-wallet%2Freact)               | React binding for EVM wallets    |
| [`@web3-wallet/react-solana`](packages/react-solana) | [![npm version](https://badge.fury.io/js/@web3-wallet%2Freact-solana.svg)](https://badge.fury.io/js/@web3-wallet%2Freact-solana) | React binding for Solana wallets |
| [`@web3-wallet/vue`](packages/vue)                   | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fvue.svg)](https://badge.fury.io/js/@web3-wallet%2Fvue)                   | Vue binding for EVM wallets      |
| [`@web3-wallet/vue-solana`](packages/vue-solana)     | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fvue-solana.svg)](https://badge.fury.io/js/@web3-wallet%2Fvue-solana)     | Vue binding for Solana wallets   |
| [`@web3-wallet/ethereum`](packages/ethereum)         | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fethereum.svg)](https://badge.fury.io/js/@web3-wallet%2Fethereum)         | Abstract EMV wallet connector    |
| [`@web3-wallet/solana`](packages/solana)             | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fsolana.svg)](https://badge.fury.io/js/@web3-wallet%2Fsolana)             | Abstract solana wallet connector |
| [`@web3-wallet/types`](packages/types)               | [![npm version](https://badge.fury.io/js/@web3-wallet%2Ftypes.svg)](https://badge.fury.io/js/@web3-wallet%2Ftypes)               | Base types                       |

## Wallets

| Package                                                                     | Version                                                                                                                                | Description                      |
| --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| **EVM Wallets**                                                             |                                                                                                                                        |                                  |
| [`@web3-wallet/injected`](packages/wallets/injected)                        | [![npm version](https://badge.fury.io/js/@web3-wallet%2Finjected.svg)](https://badge.fury.io/js/@web3-wallet%2Finjected)               | Injected connector               |
| [`@web3-wallet/metamask`](packages/wallets/ethereum/metamask)               | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fmetamask.svg)](https://badge.fury.io/js/@web3-wallet%2Fmetamask)               | Metamask connector               |
| [`@web3-wallet/defiwallet`](packages/wallets/ethereum/defiwallet)           | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fdefiwallet.svg)](https://badge.fury.io/js/@web3-wallet%2Fdefiwallet)           | Crypto.com DeFi Wallet connector |
| [`@web3-wallet/coinbase-wallet`](packages/wallets/ethereum/coinbase-wallet) | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fcoinbase-wallet.svg)](https://badge.fury.io/js/@web3-wallet%2Fcoinbase-wallet) | Coinbase wallet conector         |
| **Solana Wallets**                                                          |                                                                                                                                        |                                  |
| [`@web3-wallet/solana-phantom`](packages/wallets/solana/solana-phantom)     | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fsolana-phantom.svg)](https://badge.fury.io/js/@web3-wallet%2Fsolana-phantom)   | Phantom connector                |
| [`@web3-wallet/solana-glow`](packages/wallets/solana/solana-glow)           | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fsolana-glow.svg)](https://badge.fury.io/js/@web3-wallet%2Fsolana-glow)         | Glow connector                   |

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
pnpm install @web3-wallet/react @web3-wallet/metamask
```

```typescript
// wallets/metaMask.ts
import { MetaMaskConnector } from '@web3-wallet/metamask';
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
  useChainId,
  useAccount,
  useIsActivating,
  useIsActive,
  useProvider,
  useEnsName,
} = metaMask;

export const MetaMaskCard = () => {
  const chainId = useChainId();
  const account = useAccount();
  const isActivating = useIsActivating();

  const isActive = useIsActive();

  const provider = useProvider();
  const ensNames = useEnsNames(provider);

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
      ensName={ensName}
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
import { MetaMaskConnector } from '@web3-wallet/ethereum';
import { createWallet } from '@web3-wallet/vue';

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
  getProvider,
  getEnsName,
} = metaMask;

const provider = getProvider();
const ensNName = getEnsName(provider);

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

If the wallet you want integrate is not included in the @web3-wallet package set, you can create an wallet connector with few lines of code by extending the `InjectedConnector`.

```typescript
// Trust Wallet connector
import { createWallet } from '@web3-wallet/react';
// Or if you are using vue
// import { createWallet } from '@web3-wallet/vue';

import {
  type InjectedProvider,
  InjectedConnector,
} from '@web3-wallet/injected';

export type TrustWalletProvider = InjectedProvider & {
  isTrust?: boolean;
};

const providerFilter = (p: TrustWalletProvider) => p.isTrust;

export class TrustWalletConnector extends InjectedConnector {
  public override async detectProvider() {
    return await super.detectProvider(providerFilter);
  }
}

const trustWallet = createWallet(
  (actions) => new TrustWalletConnector(actions),
);

/**
 * imToken
 */
export type ImTokenProvider = InjectedProvider & {
  isImToken?: boolean;
};

const providerFilter = (p: ImTokenProvider) => p.isImToken;

export class ImTokenConnector extends InjectedConnector {
  public override async detectProvider(): Promise<ImTokenProvider> {
    return await super.detectProvider(providerFilter);
  }
}

const inToken = createWallet((actions) => new ImTokenConnector(actions));
```

If the wallet you want to integrate is not eip1193 compatible or has special provider detection logic, you can extend the `EthereumConnector` instead and then implement the `detectProvider` method or override few of the connector methods.

```typescript
import { EthereumConnector, type Provider } from '@web3-wallet/ethereum';

type MyWalletProvider = Provider & {
  // wallet provider props
};

export class MyWalletConnector extends EthereumConnector {
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

## License

MIT
