# Wallet

## createWallet

The createWallet function is used to create a wallet interface with a specified connector.

```ts
type CreateWallet = (connector: Connector) => Wallet;
```

Example usage:

```ts
import { MetaMask } from '@react-web3-wallet/MetaMask';
import { createWallet } from '@react-web3-wallet/react';

const metaMask = createWallet(new MetaMask());
```

## Wallet API

```ts
interface Wallet {
  getWalletName: () => WalletName;
  connect: (chain?: number | AddEthereumChainParameter) => Promise<void>;
  autoConnect: () => Promise<boolean>;
  disconnect: (force?: boolean) => Promise<void>;
  watchAsset: (asset: WatchAssetParameter) => Promise<void>;
  useIsConnecting: () => boolean;
  useIsConnected: () => boolean;
  useChainId: () => number | undefined;
  useAccount: () => string | undefined;
  useBalance: () => bigint | undefined;
  useProvider: (network?: Networkish) => BrowserProvider | undefined;
  useHasProvider: (
    providerFilter?: (provider: Provider) => boolean,
    detectProviderOptions?: DetectProviderOptions,
  ) => boolean;
}
```

### getWalletName

```ts
interface Wallet {
  getWalletName: () => WalletName;
}
```

Returns the name of the wallet. A dApp can support multiple wallets, and the wallet name serves as a unique identifier for each wallet.

### connect

```ts
export interface AddEthereumChainParameter {
  chainId: number;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: 18;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  /**
   * Currently ignored.
   */
  iconUrls?: string[];
}

type ChainId = number

interface Wallet {
  connect(chain?: ChainId | AddEthereumChainParameter) => Promise<void>
}
```

Initiates a connection to the wallet. You can pass the `chain` parameter to specify the desired chain to connect to. If the user is already connected to this chain, no additional steps will be taken. Otherwise, the user will be prompted to switch to the chain, if one of two conditions is met:

1. either the chain already have it added in their extension,
2. or the argument is of type AddEthereumChainParameter, in which case the user will be prompted to add the chain with the specified parameters first, before being prompted to switch.

### autoConnect

```ts
interface Wallet {
  autoConnect() => Promise<boolean>
}
```

Attempts to connect to the wallet automatically. The autoConnect function never rejects and always resolves. It only attempts to establish a connection without requiring further user interaction during the connecting process.

the returned promise will:

1.  resolve with `true` if the connection succeeded.
2.  resolve with `false` if the connection failed.

### disconnect

```ts
interface Wallet {
  disconnect(force?: boolean) => Promise<void>
}
```

Disconnects the wallet. Wallet connector implementations should override this method if the wallet supports forceful disconnection.

What is force disconnection?

- Forceful disconnection completely disconnects the wallet from the dApp.
- Non-forceful disconnection only resets the wallet store to its initial state. Behind the scenes, the wallet is still connected to the dApp.

For certain wallets like MetaMask, there is no way to forcefully disconnect from dApps.

For other wallets like WalletConnect, users have the option to forcefully disconnect from dApps.

### watchAsset

> This method is specified by [EIP-747](https://eips.ethereum.org/EIPS/eip-747)

```ts
interface WatchAssetParameter {
  address: string;
  symbol: string;
  decimals: number;
  image: string;
}
interface Wallet {
  watchAsset: (asset: WatchAssetParameter) => Promise<void>;
}
```

Adds an asset to the wallet's list of tracked assets.

### useIsConnecting

```ts
interface Wallet {
  useIsConnecting: () => boolean;
}
```

Indicates whether there's a pending connection. A connection can be initiated by calling either `Wallet.connect` or `Wallet.autoConnect`.

### useAccount

```ts
interface Wallet {
  useAccount: () => string | undefined;
}
```

Returns the active user wallet account(the account that the user current selected in the wallet extension/app).

### useBalance

```ts
interface Wallet {
  useBalance: () => bigint | undefined;
}
```

Returns the active user wallet account balance.

### useChainId

Returns the active user wallet chainId.

```ts
interface Wallet {
  useChainId: () =>  number| undefined;
}
```

### useIsConnected

```ts
interface Wallet {
  useIsConnected: () => boolean;
}
```

Indicates whether user is connected to the wallet. If `isConnected` is true, we can assume that:

1. the dApp/web3 site can access to the user's account.
2. the wallet provider can make RPC requests to the current chain.

useIsConnected is a convenient hook:

```ts
const useIsConnected = (): boolean => {
  return !!useAccount() && !!useChainId();
};
```

### useProvider

```ts
interface Wallet {
  useProvider: (network?: Networkish) => BrowserProvider | undefined;
}
```

Returns a `BrowserProvider` instance that wraps the underling wallet provider.

### useHasProvider

`useHasProvider` can be used to detect whether a wallet is available(installed) on user's device(browser).

```ts
const hasMetaMask = metaMask.useHasProvider();

if (!hasMetaMask) {
  // redirect user to the wallet install page
}
```
