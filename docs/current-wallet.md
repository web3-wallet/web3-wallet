# CurrentWallet

It's a common pattern that a dApp allows users to connect to several supported wallets, but with only one wallet as the current/active wallet. This pattern is so common that we made the currentWallet builtin, so that you don't need maintain the current wallet appearance in your application code.

## createCurrentWallet

```ts
type CreateCurrentWalletOptions = {
  defaultCurrentWallet?: WalletName;
  isPersist?: boolean;
  persistKey?: string;
  plugins?: Plugin[];
};

type CreateCurrentWallet = (
  connectorsOrWallets: (Connector | Wallet)[],
  options: CreateCurrentWalletOptions,
) => CurrentWallet;
```

The currentWallet object is returned from createCurrentWallet.

```ts
import { MetaMask } from '@web3-wallet/metamask';
import { DeFiWallet } from '@web3-wallet/defiwallet';
import { createCurrentWallet } from '@web3-wallet/react';
import { EnsPlugin } from '@web3-wallet/plugin-ens';
import { BalancePlugin } from '@web3-wallet/plugin-balance';

export const currentWallet = new createCurrentWallet(
  [new MetaMask(), new DefiWallet()],
  { plugins: [EnsPlugin.create(), BalancePlugin.create()] },
);
```

### defaultCurrentWallet

The default currentWallet, default to the first wallet if not provided.

### isPersist

Whether to persist the current wallet state. default true.

### persistKey

The currentWallet state will be persist to local storage, you can specify the local storage key through the persistKey option, default to `@web3-wallet/currentWallet`.

### plugins

See [Plugin](https://web3-wallet.github.io/web3-wallet/docs/wallet)

## CurrentWallet API

Most of the wallet APIs are also available on currentWallet. below only list the currentWallet only APIs. See [Wallet](https://web3-wallet.github.io/web3-wallet/docs/wallet).

```ts
export interface CurrentWallet {
  useName: () => WalletName;
  useConnectionStatus: () => WalletConnectionStatus;
  switchCurrentWallet: (name: WalletName) => void;
  connectAsCurrentWallet: (
    name: WalletName,
    chain?: number | AddEthereumChainParameter,
  ) => Promise<void>;
  useConnectAsCurrentWallet: WrappedUseMutation<
    void,
    unknown,
    { walletName: WalletName; chain?: number | AddEthereumChainParameter }
  >;
}
```

### useName

```ts
interface CurrentWallet {
  useName: () => WalletName;
}
```

Returns the currentWallet name.

### useConnectionStatus

```ts
export enum WalletConnectionStatus {
  Untouched = 'Untouched',
  Connected = 'Connected',
  Disconnected = 'Disconnected',
}

export interface CurrentWallet extends Wallet {
  useName: () => WalletName;
  useConnectionStatus: () => WalletConnectionStatus;
  useConnectAsCurrentWallet: WrappedUseMutation<
    void,
    unknown,
    { walletName: WalletName; chain?: number | AddEthereumChainParameter }
  >;
}
```

Returns the currentWallet connection status.

**WalletConnectionStatus**

The currentWallet connection status are persisted to localStorage. The connection status can only be update by calling connect, autoConnect and disconnect.

- `Untouched`: connect or autoConnect have never been called or all the calls to connect or autoConnect are rejected.
- `Connected`: calls to either connect or autoConnect resolved.
- `Disconnected`: calls to disconnect resolved.

If currentWallet is in the `Disconnected` status, autoConnect will be skipped.

### switchCurrentWallet

```ts
export interface CurrentWallet {
  switchCurrentWallet: (name: WalletName) => void;
}
```

Set the specified wallet as the currentWallet.

### connectAsCurrentWallet

```ts
export interface CurrentWallet {
  connectAsCurrentWallet: (
    name: WalletName,
    chain?: number | AddEthereumChainParameter,
  ) => Promise<void>;
}
```

Connect with the specified wallet and set it as the currentWallet if the connection succeed/resolved.

### useConnectAsCurrentWallet

connectAsCurrentWallet wrapped with [useMutation](https://tanstack.com/query/v4/docs/reference/useMutation).
