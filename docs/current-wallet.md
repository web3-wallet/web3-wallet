# CurrentWallet

It's a common pattern that a dApp allows users to connect to several supported wallets, but with only one wallet as the current/active wallet. This pattern is so common that we made the currentWallet builtin, so that you don't need maintain the current wallet appearance in your application code.

## createCurrentWallet

```ts
type CreateCurrentWalletOptions = {
  defaultCurrentWallet?: WalletName;
  persistKey?: string;
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

export const currentWallet = new createCurrentWallet([
  new MetaMask(),
  new DefiWallet(),
]);
```

### CreateCurrentWalletOptions.defaultCurrentWallet

The default currentWallet, default to the first wallet if not provided.

### CreateCurrentWalletOptions.persistKey

The currentWallet state will be persist to local storage, you can specify the local storage key through the persistKey option, default to `@web3-wallet/currentWallet`.

## CurrentWallet API

Most of the wallet APIs are also available on currentWallet. below list the currentWallet only APIs. See also [Wallet](https://web3-wallet.github.io/web3-wallet/docs/wallet).

```ts
export interface CurrentWallet extends Wallet {
  useWalletName: () => WalletName;
  switchCurrentWallet: (name: WalletName) => void;
  connectAsCurrentWallet: (
    name: WalletName,
    chain?: number | AddEthereumChainParameter,
  ) => Promise<void>;
}
```

### useWalletName

```ts
interface CurrentWallet {
  useWalletName: () => WalletName;
}
```

Returns the currentWallet name.

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

Connect with the specified wallet and set it as the currentWallet if the connected successfully.
