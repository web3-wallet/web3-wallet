# Connector

A connector is responsible for the details of connecting to a specific wallet application, such as MetaMask or DeFi Wallet. It provides a consistent and standardized interface to the upper layers of your dApp.

Connectors are considered low-level entities that are usually not used directly. Instead, you would typically pass a connector to the createWallet or createCurrentWallet functions to create a higher-level "Wallet" or "CurrentWallet" interface.

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

If you need to implement a connector for a specific wallet, you can easily do so by extending the abstract connector class provided by the @react-web3-wallet/core package. In most cases, implementing a wallet connector can be accomplished with just a few lines of code.

Here's an example of implementing a connector for MetaMask:

```ts
import type { Provider, ProviderRpcError, WalletName } from '@react-web3-wallet/core';
import { Connector } from '@react-web3-wallet/core';

import { icon } from './assets';

const providerFilter = (p: Provider) => !!p.isMetaMask;

const _name = 'MetaMask';
export const name = _name as WalletName<typeof _name>;

export class MetaMask extends Connector {
  public static walletName: WalletName<string> = name;
  public static walletIcon: string = icon;
  public walletName: WalletName<string> = name;

  constructor(options?: Connector['options']) {
    super({
      providerFilter,
      ...options,
    });
  }
}
```

You can find more examples of wallet connector implementations [here](https://github.com/web3-wallet/web3-wallet/tree/main/packages/wallets).
