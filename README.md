# Web3 Wallet

[![CI](https://github.com/web3-wallet/web3-wallet/actions/workflows/ci.yml/badge.svg)](https://github.com/web3-wallet/web3-wallet/actions/workflows/ci.yml)

<p align="center">
  <img width="200" src="site/public/logos/logo.svg?v=2" alt="web3 wallet logo" />
</p>

## Examples

<a href="https://web3-wallet.github.io/web3-wallet" target="_blank">https://web3-wallet.github.io/web3-wallet</a>

## Install

```
# React
# pnpm
pnpm add @web3-wallet/react @web3-wallet/metamask
# npm
npm install @web3-wallet/react @web3-wallet/metamask

# Vue
# pnpm
pnpm add @web3-wallet/vue @web3-wallet/metamask
#npm
npm add @web3-wallet/vue @web3-wallet/metamask
```

## Packages

| Package                                | Version                                                      | Description                                      |
| -------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------ |
| [`@web3-wallet/core`](packages/core)   | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fcore.svg)](https://badge.fury.io/js/@web3-wallet%2Fcore) | Core types and and the abstract wallet connector |
| [`@web3-wallet/react`](packages/react) | [![npm version](https://badge.fury.io/js/@web3-wallet%2Freact.svg)](https://badge.fury.io/js/@web3-wallet%2Freact) | React binding for web3 wallet                    |
| [`@web3-wallet/vue`](packages/vue)     | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fvue.svg)](https://badge.fury.io/js/@web3-wallet%2Fvue) | Vue binding for web3 wallet                      |

## Wallets

| Package                                                            | Version                                                                                                                                | Description                      |
| ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| [`@web3-wallet/injected`](packages/wallets/injected)               | [![npm version](https://badge.fury.io/js/@web3-wallet%2Finjected.svg)](https://badge.fury.io/js/@web3-wallet%2Finjected)               | Abstract Injected Connector      |
| [`@web3-wallet/metamask`](packages/wallets/metamask)               | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fmetamask.svg)](https://badge.fury.io/js/@web3-wallet%2Fmetamask)               | Metamask Connector               |
| [`@web3-wallet/defiwallet`](packages/wallets/defiwallet)           | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fdefiwallet.svg)](https://badge.fury.io/js/@web3-wallet%2Fdefiwallet)           | Crypto.com DeFi Wallet Connector |
| [`@web3-wallet/coinbase-wallet`](packages/wallets/coinbase-wallet) | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fcoinbase-wallet.svg)](https://badge.fury.io/js/@web3-wallet%2Fcoinbase-wallet) | Coinbase Wallet Connector        |
| [`@web3-wallet/walletconnect`](packages/wallets/walletconnect)     | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fwalletconnect.svg)](https://badge.fury.io/js/@web3-wallet%2Fwalletconnect)     | Walletconnect Connector          |



## Plugins

| Package                                                      | Version                                                      | Description                            |
| ------------------------------------------------------------ | ------------------------------------------------------------ | -------------------------------------- |
| [`@web3-wallet/plugin-connection-status-react`](packages/plugins/connection-status-react) | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fplugin-connection-status-react)](https://badge.fury.io/js/@web3-wallet%2Fplugin-connection-status-react) | Tracking the wallet connection status. |



## Getting started

### React

```bash
pnpm add @web3-wallet/react @web3-wallet/metamask
```

```typescript
import { rpcMap } from '@site/chains';
import { CoinbaseWallet } from '@web3-wallet/coinbase-wallet';
import { CryptocomDesktopWallet } from '@web3-wallet/cryptocom-desktop-wallet';
import { getDeFiWallet } from '@web3-wallet/defiwallet';
import { MetaMask } from '@web3-wallet/metamask';
import { ConnectionStatusPlugin } from '@web3-wallet/plugin-connection-status-react';
import { WalletProxy } from '@web3-wallet/react';
import { WalletConnect } from '@web3-wallet/walletconnect';

const connectors = [
  new MetaMask(),
  getDeFiWallet({
    extension: {
      chainType: 'eth',
      appName: '@web3-wallet example',
      chainId: 1,
      rpcUrls: {},
    },
  }),
  new CoinbaseWallet({
    providerOptions: {
      appName: '@web3-wallet example',
      reloadOnDisconnect: false,
      url: rpcMap[1],
    },
  }),
  new CryptocomDesktopWallet(),
  new WalletConnect({
    providerOptions: {
      rpc: rpcMap,
    },
  }),
];

const plugins = [ConnectionStatusPlugin.createPlugin()];

export const walletProxy = new WalletProxy(connectors, {
  plugins,
});

export const allWallets = walletProxy.getWallets();

export const currentWallet = walletProxy.getCurrentWallet();

// wallets
export const metamask = walletProxy.getWallet(connectors[0].name);
export const defiwallet = walletProxy.getWallet(connectors[1].name);
export const coinbaseWallet = walletProxy.getWallet(connectors[2].name);
export const desktopWallet = walletProxy.getWallet(connectors[3].name);
export const walletconnect = walletProxy.getWallet(connectors[4].name);

```

## More wallets

If the wallet you want integrate with is not included in the @web3-wallet packages set, you can create a wallet Connector with few lines of code by extending the `Injected` Connector.

```typescript
// Trust Wallet connector
import type {
  type Connector,
  type WalletName,
  type WalletOptions,
  createWallet,
} from '@web3-wallet/react';

import { type InjectedProvider, Injected } from '@web3-wallet/injected';

export const walletName = 'Trust' as WalletName<'Trust'>;

export type TrustWalletProvider = InjectedProvider & {
  isTrust?: boolean;
};

export type TrustWalletOptions = WalletOptions;

const providerFilter = (p: TrustWalletProvider) => p.isTrust;

export class TrustWallet extends Injected<
  TrustWalletProvider,
  TrustWalletOptions
> {
  constructor(options?: TrustWalletOptions) {
    super(walletName, options);
  }

  public override async detectProvider(): Promise<TrustWalletProvider> {
    return await super.detectProvider(providerFilter);
  }
}

const trustWallet = createWallet((actions) => new TrustWallet({ actions }));
```

If the wallet you want to integrate with is not eip1193 compatible or has special provider detection logic, you can extend the `Connector` instead and then implement the `detectProvider` method and override few of the Connector methods.

```typescript
import type {
  type Connector,
  type WalletName,
  type WalletOptions,
  createWallet,
} from '@web3-wallet/react';

type MyWalletProvider = Provider & {
  // wallet provider props
};

export type MyWalletOptions = WalletOptions & {
  // wallet provider props
};

export const walletName = 'MyWallet' as WalletName<'MyWallet'>;

export class MyWallet extends Connector<MyWalletProvider, MyWalletOptions> {
  constructor(options?: MyWalletOptions) {
    super(walletName, options);
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
pnpm example-vue
# optional
pnpm watch # watch for packages change

# test
pnpm test
```

## License

MIT
