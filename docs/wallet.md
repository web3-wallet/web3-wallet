# Wallet

## createWallet

```ts
type CreateWallet = (
  connector: Connector,
  options: {
    plugins?: [];
  },
) => Wallet;
```

The wallet object is returned from createWallet.

```ts
import { MetaMask } from '@web3-wallet/MetaMask';
import { createWallet } from '@web3-wallet/react';

const metaMask = createWallet(new MetaMask());
```

## Wallet API

```ts
interface Wallet {
  getName: () => WalletName;
  connect: (chain?: number | AddEthereumChainParameter) => Promise<void>;
  autoConnect: () => Promise<boolean>;
  disconnect: (force?: boolean) => Promise<void>;
  watchAsset: (asset: WatchAssetParameter) => Promise<void>;
  useIsConnecting: () => boolean;
  useChainId: () => number | undefined;
  useAccount: () => string | undefined;
  useIsConnected: () => boolean;
  useProvider: (network?: Networkish) => Web3Provider | undefined;
  getPluginApi: <PluginApi>(pluginName: PluginName) => PluginApi;
  useConnect: WrappedUseMutation<
    void,
    unknown,
    { chain?: number | AddEthereumChainParameter } | void
  >;
  useAutoConnect: WrappedUseMutation<boolean, unknown, void>;
  useDisconnect: WrappedUseMutation<
    void,
    unknown,
    {
      force?: boolean;
    } | void
  >;
  useWatchAsset: WrappedUseMutation<
    void,
    unknown,
    {
      asset: WatchAssetParameter;
    }
  >;
}
```

### getName

```ts
interface Wallet {
  getName: () => WalletName;
}
```

Returns the wallet name. A dApp usually support create multiple wallets. The wallet name is mean to be used as the wallet id.

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

Try to connect to wallet. autoConnect never reject, it will always resolve. autoConnect only try to connect to wallet, if it don't need any further user interaction with the wallet in the connecting process.

the returned promise will:

1.  resolve with `true` if the connection succeeded.
2.  resolve with `false` if the connection failed.

### disconnect

```ts
interface Wallet {
  disconnect(force?: boolean) => Promise<void>
}
```

Wallet connector implementors should override this method if the wallet supports force disconnect.

What is force disconnect?

- force disconnect will actually disconnect the wallet.
- non-disconnect only reset the wallet store to it's initial state.

For some wallets, MetaMask for example, there're not way to force disconnect MetaMask.
For some wallets, Walletconnect for example, we are able to force disconnect Walletconnect.

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

Add an asset to the wallet assets list.

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

Returns the active user wallet account -- the account that the user current selected in the wallet extension/app.

### useChainId

Returns the active user wallet chainId -- the chain that the user current connected in the wallet extension/app.

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
  useProvider: (network?: Networkish) => Web3Provider | undefined;
}
```

Returns a [Web3Provider](https://docs.ethers.io/v5/api/providers/other/#Web3Provider) instance that wraps the underling wallet provider.

### getPluginApi

```ts
interface Wallet {
  getPluginApi: <PluginApi>(pluginName: PluginName) => PluginApi;
}
```

Get the api of the plugin specified by `pluginName`. See [Plugin](https://web3-wallet.github.io/web3-wallet/docs/plugin).

example:

```ts
import { ensPlugin } from '@web3-wallet/plugin-ens';

const pluginApi = getPluginApi<ensPlugin.API>(ensPlugin.pluginName);

const ensName = pluginApi.useEnsName();
```

### useConnect

```ts
interface Wallet {
  useConnect: WrappedUseMutation<
    void,
    unknown,
    { chain?: number | AddEthereumChainParameter } | void
  >;
}
```

connect wrapped with [useMutation](https://tanstack.com/query/v4/docs/reference/useMutation).

### useAutoConnect

autoConnect wrapped with [useMutation](https://tanstack.com/query/v4/docs/reference/useMutation).

### useDisConnect

disConnect wrapped with [useMutation](https://tanstack.com/query/v4/docs/reference/useMutation).

### useWatchAsset

useWatchAsset wrapped with [useMutation](https://tanstack.com/query/v4/docs/reference/useMutation).
