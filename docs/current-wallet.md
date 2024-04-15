# CurrentWallet

The CurrentWallet feature enables dApps to support multiple wallets while keeping only one wallet active at a time. This built-in feature eliminates the need to handle the current wallet state in your application code. 

While typically you only have one active wallet, there are scenarios where you may require multiple active wallets. In such cases, you can create multiple CurrentWallet instances.

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

The createCurrentWallet function returns the currentWallet interface.

```ts
import { MetaMask } from '@react-web3-wallet/metamask';
import { DeFiWallet } from '@react-web3-wallet/defiwallet';
import { createCurrentWallet } from '@react-web3-wallet/react';

export const currentWallet = createCurrentWallet([
  new MetaMask(),
  new DeFiWallet(),
]);
```

### CreateCurrentWalletOptions.defaultCurrentWallet

The defaultCurrentWallet option allows you to specify the default wallet for currentWallet. If not provided, the first wallet in the list will be set as the default.


### CreateCurrentWalletOptions.persistKey
The persistKey option allows you to specify the key used for persisting the currentWallet state in local storage. By default, the key is set to `@react-web3-wallet/currentWallet`.

## CurrentWallet API

Most wallet APIs are available on the currentWallet object. The following additional APIs are specific to currentWallet. See also the [Wallet](https://web3-wallet.github.io/web3-wallet/docs/wallet) documentation for other available APIs.

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

The connectAsCurrentWallet function connects to the specified wallet and sets it as the current wallet if the connection is successful.