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

const { autoConnect } = metamask;

export const App = () => {
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

export const currentWallet = new createCurrentWallet([
  new MetaMask(),
  new DefiWallet(),
]);

const {
  // current wallet only apis
  useName,
  switchCurrentWallet,
  connectAsCurrentWallet,
  useConnectAsCurrentWallet,
} = currentWallet;
```

## A wallet modal example

In this minimal wallet modal example, we will:

1. Setup MetaMask and DeFi Wallet.
2. Create a wallet modal in which user can choose either MetaMask or DeFi Wallet to connect to our dApp.
3. Display the connected wallet account/address.
4. Check out [examples/react](https://github.com/web3-wallet/web3-wallet/tree/main/packages/examples/react) to see the complete example.

```tsx
// src/wallet.ts
// ===========================
import { MetaMask } from '@web3-wallet/metamask';
import { DefiWallet } from '@web3-wallet/defiwallet';
import { type WalletName, createCurrentWallet } from '@web3-wallet/react';
import { useEffect } from 'react';

export const currentWallet = new createCurrentWallet([
  new MetaMask(),
  new DefiWallet(),
]);

export type WalletConfig = {
  label: string;
  // wallet name is the unique id of the wallet
  name: WalletName;
  icon: MetaMask.walletIcon;
};

export const walletConfigs: WalletConfig[] = [
  {
    label: 'MetaMask',
    name: MetaMask.walletName,
    icon: MetaMask.walletIcon,
  },
  {
    label: 'DeFi Wallet',
    name: DefiWallet.walletName,
    icon: DefiWallet.walletIcon,
  },
];

const getWalletConfig = (name: WalletName): WalletConfig => {
  return walletConfigs.find((v) => v.name === name)!;
};

// src/app.tsx
// ===========================
import { currentWallet, getWalletConfig } from './wallet';

const { autoConnect, useAccount, useName } = currentWallet;
export const App = () => {
  useEffect(() => {
    // auto connect on app mount
    autoConnect();
  }, []);

  const account = useAccount();
  const walletConfig = getWalletConfig(uesName());

  return (
    <main id="app">
      <Button onClick={openWalletModal}>Connect</Button>
      <WalletModal />

      <p>Your connected to: `${walletConfig.label}`</p>
      <p>Your wallet account is: `${account}`</p>
    </main>
  );
};

// src/components/WalletModal.tsx
// ==============================
import { currentWallet, walletConfigs } from '../wallet';

export const WalletModal = () => {
  return (
    <div class="wallet-modal">
      {walletConfigs.map(({ label, name, icon }) => (
        <div
          key={name}
          role="button"
          onClick={() => {
            currentWallet.connectAsCurrentWallet(name, 1);
          }}
          style={{
            display: 'flex',
            alignItem: 'center',
            gap: 10,
            cursor: 'point',
          }}
        >
          <img width="24px" height="24px" src={icon} alt={`$label} icon`} />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
};
```

## Use with @tanstack/query

[@tanstack/query](https://tanstack.com/query/v4) is a fantastic and very popular library for async state(server side state) management. Web3 wallet uses @tanstack/query under the hood for managing async state. But the core web3 wallet functionalities does not depends on @tanstack/query. If all you need is the core wallet functionalities, you don't need to setup @tanstack/query.

In order to use web3-wallet with @tanstack/query, you need to Wrap your App component with `Web3WalletQueryClientProvider`.

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

export const currentWallet = new createCurrentWallet(
  [new MetaMask(), new DefiWallet()],
  { plugins: [EnsPlugin.create(), BalancePlugin.create()] },
);

const {
  getPlugin,

  // wallet apis that depends on @tanstack/query
  useConnect,
  useAutoConnect,
  useDisConnect,
  useWatchAsset,
} = currentWallet;

export const App = () => {
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

  // ....
};
```
