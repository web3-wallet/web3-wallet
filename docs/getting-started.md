# Get Started

## Install

```bash
pnpm add @web3-wallet/react @web3-wallet/metamask
```

## Create a wallet

If you only need to integrate a single wallet to your dApp:

```typescript
import { MetaMask } from '@web3-wallet/metamask';
import { createWallet } from '@web3-wallet/react';
import { EnsPlugin } from '@web3-wallet/plugin-ens';
import { BalancePlugin } from '@web3-wallet/plugin-balance';

export const plugins = [EnsPlugin.create(), BalancePlugin.create()];

const metamask = createWallet(new MetaMask(), { plugins });

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

```typescript
import { MetaMask } from '@web3-wallet/metamask';
import { DefiWallet } from '@web3-wallet/defiwallet';
import { WalletManager } from '@web3-wallet/react';
import { EnsPlugin } from '@web3-wallet/plugin-ens';
import { BalancePlugin } from '@web3-wallet/plugin-balance';

const connectors = [new MetaMask(), new DefiWallet()];
export const plugins = [EnsPlugin.create(), BalancePlugin.create()];

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
