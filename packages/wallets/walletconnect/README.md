# Walletconnect

## Install

```bash
pnpm add @web3-wallet/walletconnect
```

## Usage

@web3-wallet/walletconnect is a wrap on top of [WalletConnect v2.0](https://docs.walletconnect.com/2.0/advanced/migration-from-v1.x/what-changed-from-v1.0). Walletconnect v2.0 is NOT backwards-compatible with v1.0. WalletConnect v1.0 and v2.0 offer essentially the same end-user experience, however they work very differently internally.

```ts
import { Walletconnect } from '@web3-wallet/walletconnect';
import { createWallet } from '@web3-wallet/react';

const wallet = new WalletConnect({
  providerOptions: {
    // your projectId
    // see: https://docs.walletconnect.com/2.0/advanced/migration-from-v1.x/what-changed-from-v1.0#project-id
    projectId: 'xxx',
    rpcMap,
    /**
     * @note Chains that your app intents to use and the peer MUST support.
     *  If the peer does not support these chains, the connection will be rejected.
     * @default [1]
     * @example [1, 3, 4, 5, 42]
     */
    chains: [1],
    /**
     * @note Optional chains that your app MAY attempt to use and the peer MAY support.
     *  If the peer does not support these chains, the connection will still be established.
     * @default [1]
     * @example [1, 3, 4, 5, 42]
     */
    optionalChains: [25],
    showQrModal: true,
    optionalMethods: ['eth_signTypedData', 'eth_signTypedData_v4', 'eth_sign'],
    qrModalOptions: {
      // 'dark' | 'light'
      themeMode: 'dark',
    },
  },
});
```
