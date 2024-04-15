## Migrate from @web3-wallet@v2 to @react-web3-wallet@v3

@web3-wallet@v2 uses [ethers.js@v5](https://github.com/ethers-io/ethers.js) behind the scene, @react-web3-wallet@v3 is released to support ethers.js@v6.

### Noticeable breaking changes

1. The @web3-wallet@v2 npm packages were published under the @web3-wallet namespace, while the @react-web3-wallet@v3 packages are now published under the @react-web3-wallet namespace.
2. [ethers.js@v6](https://github.com/ethers-io/ethers.js) removed its own `BigNumber` type and now uses the native JavaScript `bigint` type.

### Migration path

All most all the @react-web3-wallet@v3 APIs remain the same as the v2 APIs, making the migration process straightforward.

#### Migrated from ethers@v5 to ethers@v6. 

Since @react-web3-wallet@v3 depends on ethers@v6, it is necessary to migrate from ethers@v5 to ethers@v6 first. Please refer to the ethers@v6 migration documentation for guidance on this migration.

[ethers@v6 Migration docs:](https://docs.gelato.network/web3-services/relay/migration-guide-ethers.js-v5-to-v6)
 
#### Update imports

In @react-web3-wallet@v3, the npm package namespace has been changed from @web3-wallet to @react-web3-wallet.

**@web3-wallet@v2**
```ts
import type { Connector, WalletName } from '@web3-wallet/react';
import { createCurrentWallet } from '@web3-wallet/react';
import { MetaMask } from '@web3-wallet/metamask';
```

**@react-web3-wallet@v3**
```ts
import type { Connector, WalletName } from '@react-web3-wallet/react';
import { createCurrentWallet } from '@react-web3-wallet/react';
import { MetaMask } from '@react-web3-wallet/metamask';
```

#### API migrations:

- `useProvider` now returns `BrowserProvider` instead of `Web3Provider`.
- `useBalance` now returns `bigint` instead of `string`.

**@web3-wallet@v2**
```ts
interface Wallet {
  // ....
  useProvider: () => Web3Provider | undefined;
  useBalance: () => string | undefined;
  // ....
}
```

**@react-web3-wallet@v3**
```ts
interface Wallet {
  // ....
  useProvider: () => BrowserProvider | undefined;
  useBalance: () => bigint | undefined;
  // ....
}
```