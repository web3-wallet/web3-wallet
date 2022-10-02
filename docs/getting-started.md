# Get Started

## Install

```bash
pnpm add @web3-wallet/react @web3-wallet/metamask
```

## Create a single wallet

If you only need to integrate a single wallet to your dApp.

```typescript
// wallet.ts
import { MetaMask } from '@web3-wallet/metamask';
import { createWallet } from '@web3-wallet/react';

const metamask = createWallet(new MetaMask());

const {
  name,

  connect,
  autoConnect,
  disconnect,

  useIsConnecting,
  useIsConnected,

  useAccounts,
  useChainId,
  useProvider,
} = metamask;

// App.tsx
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

## Create and manage multiple wallets through a wallet proxy.

Most of the dApps allow users to connect to several supported wallets. If this is your case, you should use a wallet proxy to help you create and manage multiple wallets. Though most dApps support multiple wallets, but there is usually only one wallet that user is currently using. A wallet proxy expose and maintain a `currentWallet`, which is usually what you want to use in your dApp.

```typescript

// wallets.ts
import { MetaMask } from '@web3-wallet/metamask';
import { DefiWallet } from '@web3-wallet/defiwallet';
import { WalletProxy } from '@web3-wallet/react';

const connectors = [
  new MetaMask(),
  new DefiWallet(),
];

export const walletProxy = new WalletProxy(connectors);
export const allWallets = walletProxy.getWallets();
export const currentWallet = walletProxy.getCurrentWallet();
export const [metamask, defiWallet] = allWallets;

// App.tsx
const {
  useName,
  switchCurrentWallet,

  usePlugin,

  connect,
  autoConnect,
  disconnect,

  useIsConnecting,
  useIsConnected,

  useAccounts,
  useChainId,
  useProvider,
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
  }, [walletName]);

  return (
  );
};
```
