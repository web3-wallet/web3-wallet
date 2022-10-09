# Connector

A connector knowns the detail of how to connect to a specific wallet application such as MetaMask and DeFi Wallet, providing a consistent abstract interface to the upper layer.

Connector is a low level entity, except feeding a connector to `createWallet` and `createCurrentWallet`, you normally don't need to use connector directly in your dApp.

```ts
const metaMaskConnector = new MetaMask();
const deFiWalletConnector = new DeFiWallet();
const metamask = createWallet(metaMaskConnector);
const currentWallet = createCurrentWallet([
  metaMaskConnector,
  deFiWalletConnector,
]);
```

## Implement a Connector for a wallet

If you want to implement a connector for a wallet, you should extends the abstract connector class from the @web3-wallet/core package. Most of the time, a wallet connector can be implemented with few lines of code. Below is how the MetaMask connector is implemented:

```ts
import type { Provider, ProviderRpcError, WalletName } from '@web3-wallet/core';
import { Connector } from '@web3-wallet/core';

import { icon } from './assets';

const providerFilter = (p: Provider) => !!p.isMetaMask;

const _name = 'MetaMask';
export const name = _name as WalletName<typeof _name>;

export class MetaMask extends Connector {
  public static walletName: WalletName<string> = name;
  public static walletIcon: string = icon;
  public name: WalletName<string> = name;

  constructor(options?: Connector['options']) {
    super({
      providerFilter,
      ...options,
    });
  }
}
```

Check out more wallet connector Implementation examples [here](https://github.com/web3-wallet/web3-wallet/tree/main/packages/wallets).
