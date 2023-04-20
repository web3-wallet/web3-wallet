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

It's a common pattern for dApps to support multiple wallets, but typically only one wallet can be active at a time. If your dApp follows this pattern, current wallet is what you need.

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
  useWalletName,
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

const { autoConnect, useAccount, useWalletName } = currentWallet;
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
