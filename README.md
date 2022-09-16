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
pnpm add @web3-wallet/react @web3-wallet/metamask

# Vue
pnpm add @web3-wallet/vue @web3-wallet/metamask
```

## Packages

| Package                                                                                   | Version                                                                                                                                                              | Docs |
| ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| [`@web3-wallet/core`](packages/core)                                                      | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fcore.svg)](https://badge.fury.io/js/@web3-wallet%2Fcore)                                                     | --   |
| [`@web3-wallet/react`](packages/react)                                                    | [![npm version](https://badge.fury.io/js/@web3-wallet%2Freact.svg)](https://badge.fury.io/js/@web3-wallet%2Freact)                                                   | --   |
| [`@web3-wallet/vue`](packages/vue)                                                        | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fvue.svg)](https://badge.fury.io/js/@web3-wallet%2Fvue)                                                       | --   |
| **Wallets**                                                                               |                                                                                                                                                                      |      |
| [`@web3-wallet/metamask`](packages/wallets/metamask)                                      | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fmetamask.svg)](https://badge.fury.io/js/@web3-wallet%2Fmetamask)                                             | --   |
| [`@web3-wallet/defiwallet`](packages/wallets/defiwallet)                                  | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fdefiwallet.svg)](https://badge.fury.io/js/@web3-wallet%2Fdefiwallet)                                         | --   |
| [`@web3-wallet/coinbase-wallet`](packages/wallets/coinbase-wallet)                        | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fcoinbase-wallet.svg)](https://badge.fury.io/js/@web3-wallet%2Fcoinbase-wallet)                               | --   |
| [`@web3-wallet/walletconnect`](packages/wallets/walletconnect)                            | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fwalletconnect.svg)](https://badge.fury.io/js/@web3-wallet%2Fwalletconnect)                                   | --   |
| [`@web3-wallet/trust-wallet`](packages/wallets/trust-wallet)                              | [![npm version](https://badge.fury.io/js/@web3-wallet%2Ftrust-wallet.svg)](https://badge.fury.io/js/@web3-wallet%2Ftrust-wallet)                                     | --   |
| [`@web3-wallet/imtoken`](packages/wallets/imtoken)                                        | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fimtoken.svg)](https://badge.fury.io/js/@web3-wallet%2Fimtoken)                                               | --   |
| [`@web3-wallet/cryptocom-desktop-wallet`](packages/wallets/cryptocom-desktop-wallet)      | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fcryptocom-desktop-wallet.svg)](https://badge.fury.io/js/@web3-wallet%2Fcryptocom-desktop-wallet)             | --   |
| [`@web3-wallet/brave-wallet`](packages/wallets/brave-wallet)                              | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fbrave-wallet.svg)](https://badge.fury.io/js/@web3-wallet%2Fbrave-wallet)                                     | --   |
| **Plugins**                                                                               |                                                                                                                                                                      |      |
| [`@web3-wallet/plugin-balance-react`](packages/plugins/balance-react)                     | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fplugin-balance-react.svg)](https://badge.fury.io/js/@web3-wallet%2Fplugin-balance-react)                     | --   |
| [`@web3-wallet/plugin-ens-react`](packages/plugins/ens-react)                             | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fplugin-ens-react.svg)](https://badge.fury.io/js/@web3-wallet%2Fplugin-ens-react)                             | --   |
| [`@web3-wallet/plugin-connection-status-react`](packages/plugins/connection-status-react) | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fplugin-connection-status-react.svg)](https://badge.fury.io/js/@web3-wallet%2Fplugin-connection-status-react) | --   |
| **Utilities**                                                                             |                                                                                                                                                                      |      |
| [`@web3-wallet/detect-provider`](packages/detect-provider)                                | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fdetect-provider.svg)](https://badge.fury.io/js/@web3-wallet%2Fdetect-provider)                               | --   |

## Getting started

- [site](./site)
- [example-react](./packages/examples/react/)
- [example-vue](./packages/examples/vue/)

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
import { DefiWallet } from '@web3-wallet/defiwallet';
import { WalletProxy } from '@web3-wallet/react';
import { WalletConnect } from '@web3-wallet/walletconnect';
import { BalancePlugin } from '@web3-wallet/plugin-balance-react';
import { EnsPlugin } from '@web3-wallet/plugin-ens-react';

// setup wallets and plugins
// ===========================

const connectors = [
  new MetaMask(),
  new DefiWallet(),
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

const plugins = [BalancePlugin.create(), EnsPlugin.create()];

export const walletProxy = new WalletProxy(connectors, {
  plugins,
});

export const allWallets = walletProxy.getWallets();
export const currentWallet = walletProxy.getCurrentWallet();
export const [
  metamask,
  defiWallet,
  coinbaseWallet,
  desktopWallet,
  walletconnect,
] = allWallets;

// use wallets and plugins in UI components
// ========================================

const {
  useName,
  switchCurrentWallet,

  usePlugin,

  connect,
  autoConnectOnce,
  disconnect,

  useIsConnecting,
  useIsConnected,

  useAccounts,
  useChainId,
  useProvider,
} = currentWallet;

export const WalletSelectCard = () => {
  const walletName = useName();
  const isConnecting = useIsConnecting();
  const isConnected = useIsConnected();

  const chainId = useChainId();
  const accounts = useAccounts();
  const provider = useProvider();

  const { useBalances } = usePlugin<BalancePlugin.Api>(
    BalancePlugin.name,
  ).hooks;
  const { useEnsNames } = usePlugin<EnsPlugin.Api>(EnsPlugin.name).hooks;

  const balances = useBalances();
  const ensNames = useEnsNames();

  useEffect(() => {
    autoConnectOnce();
    /**
     * autoConnectOnce per wallet
     */
  }, [walletName]);

  return (
    <Card>
      <WalletSelect
        wallets={allWallets}
        currentWalletName={walletName}
        switchCurrentWallet={switchCurrentWallet}
      />
      <WalletCard>
        <Text fontWeight="bold">{walletName}</Text>
        <WalletStatus isConnecting={isConnecting} isConnected={isConnected} />
        <Chain chainId={chainId} />
        <Accounts
          accounts={accounts}
          provider={provider}
          balances={balances}
          ensNames={ensNames}
        />
        <ConnectWithSelect
          connect={connect}
          disconnect={disconnect}
          chainId={chainId}
          isConnecting={isConnecting}
          isConnected={isConnected}
        />
      </WalletCard>
    </Card>
  );
};
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
