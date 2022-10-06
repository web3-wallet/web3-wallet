# Get Started

## Install

```bash
pnpm add @web3-wallet/react @web3-wallet/metamask
```

## Create a wallet

If you only need to integrate a single wallet to your dApp:

```ts
import { MetaMask } from '@web3-wallet/metamask';
import { createWallet } from '@web3-wallet/react';

const metamask = createWallet(new MetaMask());

const {
  getName,
  getPlugin,
  connect,
  autoConnect,
  disconnect,
  useIsConnecting,
  useIsConnected,
  useAccounts,
  useChainId,
  useProvider,
} = metamask;

export const App = () => {
  const walletName = getName();
  const isConnecting = useIsConnecting();
  const isConnected = useIsConnected();
  const chainId = useChainId();
  const accounts = useAccounts();
  const provider = useProvider();

  useEffect(() => {
    autoConnect();
  }, []);

  // ....
};
```

## Create a current wallet

It's a common pattern that a dApp allows users to connect to several supported wallets, but with only one wallet as the current/active wallet. If this is your case, you should use a current wallet instead.

```ts
import { MetaMask } from '@web3-wallet/metamask';
import { DefiWallet } from '@web3-wallet/defiwallet';
import { createCurrentWallet } from '@web3-wallet/react';

const connectors = [new MetaMask(), new DefiWallet()];

export const currentWallet = new createCurrentWallet(connectors);

const {
  getPlugin,
  connect,
  autoConnect,
  disconnect,
  useIsConnecting,
  useIsConnected,
  useAccounts,
  useChainId,
  useProvider,

  // current wallet only apis
  useName,
  switchCurrentWallet,
  connectAsCurrentWallet,
} = currentWallet;

export const App = () => {
  const walletName = useName();
  const isConnecting = useIsConnecting();
  const isConnected = useIsConnected();
  const chainId = useChainId();
  const accounts = useAccounts();
  const provider = useProvider();

  useEffect(() => {
    autoConnect();
  }, []);

  // ....
};
```

## Use with @tanstack/query

[@tanstack/query](https://tanstack.com/query/v4) is a fantastic and very popular library for async state(server side state) management. Web3 wallet uses @tanstack/query under the hood for managing async state. But the core wallet functionalities of does not depends on @tanstack/query. If all you need is the core wallet functionalities, you don't need to setup @tanstack/query.

In order use web3-wallet with @tanstack/query, all you need to do is Wrap your App component with `Web3WalletQueryClientProvider`.

```tsx
import { theme } from '@site/theme';
import { Web3WalletQueryClientProvider } from '@web3-wallet/react';

function MyApp() {
  return (
    <>
      <Web3WalletQueryClientProvider>
        <App>
      </Web3WalletQueryClientProvider>
    </>
  );
}

```

```ts
import { MetaMask } from '@web3-wallet/metamask';
import { DefiWallet } from '@web3-wallet/defiwallet';
import { createCurrentWallet } from '@web3-wallet/react';
import { EnsPlugin } from '@web3-wallet/plugin-ens';
import { BalancePlugin } from '@web3-wallet/plugin-balance';

const connectors = [new MetaMask(), new DefiWallet()];
const plugins = [EnsPlugin.create(), BalancePlugin.create()];

export const currentWallet = new createCurrentWallet(connectors, { plugins });

const {
  getPlugin,
  connect,
  autoConnect,
  disconnect,
  useIsConnecting,
  useIsConnected,
  useAccounts,
  useChainId,
  useProvider,

  // current wallet only apis
  useName,
  switchCurrentWallet,
  connectAsCurrentWallet,

  // wallet apis that depends on @tanstack/query
  useConnect,
  useAutoConnect,
  useDisConnect,
  useWatchAsset,
} = currentWallet;

export const App = () => {
  const walletName = useName();
  const isConnecting = useIsConnecting();
  const isConnected = useIsConnected();
  const chainId = useChainId();
  const accounts = useAccounts();
  const provider = useProvider();

  // EnsPlugin and BalancePlugin are also depends on @tanstack/query
  const { useBalances } = getPluginApi<BalancePlugin.Api>(BalancePlugin.name);
  const { useEnsNames } = getPluginApi<EnsPlugin.Api>(EnsPlugin.name);

  // @tanstack/query useQuery api
  // see: https://tanstack.com/query/v4/docs/reference/useQuery
  const { data, isLoading, isError, ...more } = useBalances();
  const { data, isLoading, isError, ...more } = useEnsNames();

  // @tanstack/query useMutation api
  // see: https://tanstack.com/query/v4/docs/reference/useMutation
  const { mutate, isLoading, isError, ...more } = useConnect(options);

  mutate(
    { chain: 1 },
    {
      onSuccess: () => {
        console.log('connected to wallet');
      },
      onError: (error) => {
        console.log('Failed to connect to wallet: ', error);
      },
    },
  );

  useEffect(() => {
    autoConnect();
  }, []);

  // ....
};
```
