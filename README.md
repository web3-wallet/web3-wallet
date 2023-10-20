# Web3 Wallet

[![CI](https://github.com/web3-wallet/web3-wallet/actions/workflows/ci.yml/badge.svg)](https://github.com/web3-wallet/web3-wallet/actions/workflows/ci.yml) [![Deploy](https://github.com/web3-wallet/web3-wallet/actions/workflows/deploy.yml/badge.svg)](https://github.com/web3-wallet/web3-wallet/actions/workflows/deploy.yml)

<p align="center">
  <a href="https://web3-wallet.github.io/web3-wallet" target="_blank">
    <img width="560px" src="site/public/images/site-home-screenshot.png?v3" alt="web3 wallet website" />
  </a>
</p>

## Documentation

https://web3-wallet.github.io/web3-wallet

## Projects that use @web3-wallet

- [minted.network](https://minted.network/)
- [cronosid.xyz](https://cronosid.xyz/)
- [veno.finance](https://veno.finance/)
- [fulcrom.finance](https://fulcrom.finance/)
- [corgiai.xyz](https://corgiai.xyz/)
- [tectonic.finance](https://tectonic.finance/)
- [kaching.win](https://kaching.win/)
- [vvs.finance](https://vvs.finance/)

## Packages

| Package                                                                              | Version                                                                                                                                                  |
| :----------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@web3-wallet/core`](packages/core)                                                 | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fcore.svg)](https://badge.fury.io/js/@web3-wallet%2Fcore)                                         |
| [`@web3-wallet/react`](packages/react)                                               | [![npm version](https://badge.fury.io/js/@web3-wallet%2Freact.svg)](https://badge.fury.io/js/@web3-wallet%2Freact)                                       |
| **Wallets**                                                                          |                                                                                                                                                          |
| [`@web3-wallet/metamask`](packages/wallets/metamask)                                 | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fmetamask.svg)](https://badge.fury.io/js/@web3-wallet%2Fmetamask)                                 |
| [`@web3-wallet/defiwallet`](packages/wallets/defiwallet)                             | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fdefiwallet.svg)](https://badge.fury.io/js/@web3-wallet%2Fdefiwallet)                             |
| [`@web3-wallet/coinbase-wallet`](packages/wallets/coinbase-wallet)                   | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fcoinbase-wallet.svg)](https://badge.fury.io/js/@web3-wallet%2Fcoinbase-wallet)                   |
| [`@web3-wallet/walletconnect`](packages/wallets/walletconnect)                       | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fwalletconnect.svg)](https://badge.fury.io/js/@web3-wallet%2Fwalletconnect)                       |
| [`@web3-wallet/trust-wallet`](packages/wallets/trust-wallet)                         | [![npm version](https://badge.fury.io/js/@web3-wallet%2Ftrust-wallet.svg)](https://badge.fury.io/js/@web3-wallet%2Ftrust-wallet)                         |
| [`@web3-wallet/imtoken`](packages/wallets/imtoken)                                   | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fimtoken.svg)](https://badge.fury.io/js/@web3-wallet%2Fimtoken)                                   |
| [`@web3-wallet/cryptocom-desktop-wallet`](packages/wallets/cryptocom-desktop-wallet) | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fcryptocom-desktop-wallet.svg)](https://badge.fury.io/js/@web3-wallet%2Fcryptocom-desktop-wallet) |
| [`@web3-wallet/brave-wallet`](packages/wallets/brave-wallet)                         | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fbrave-wallet.svg)](https://badge.fury.io/js/@web3-wallet%2Fbrave-wallet)                         |
| [`@web3-wallet/xdefi`](packages/wallets/xdefi)                                       | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fxdefi.svg)](https://badge.fury.io/js/@web3-wallet%2Fxdefi)                                       |
| [`@web3-wallet/bitget-wallet`](packages/wallets/bitget-wallet)                       | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fbitget-wallet.svg)](https://badge.fury.io/js/@web3-wallet%2Fbitget-wallet)                       |
| **Utilities**                                                                        |                                                                                                                                                          |
| [`@web3-wallet/detect-provider`](packages/detect-provider)                           | [![npm version](https://badge.fury.io/js/@web3-wallet%2Fdetect-provider.svg)](https://badge.fury.io/js/@web3-wallet%2Fdetect-provider)                   |

## Development

- [node@18.x](https://nodejs.org/en)
- [pnpm@8.x](https://pnpm.io/installation)

```bash
# install pnpm: https://pnpm.io/installation

# install dependencies
pnpm install

# start the dev server at: http://localhost:3003/web3-wallet
pnpm dev

# test
pnpm test
```

## Examples

### [cronos-wallet-connections](https://github.com/kentimsit/cronos-wallet-connections)

cronos-wallet-connections is a boilerplate for Cronos dapp.

### [site](./site)

The @web3-wallet documentation site itself provides an illustration of how to use web3-wallet. You can refer to the site as an example of web3-wallet usage.

Run the site in your local:

```
# clone this repo
git clone git@github.com:web3-wallet/web3-wallet.git

# install dependencies
pnpm install

# start the site in dev mode
pnpm dev
```

### [example-react](./packages/examples/react/)

Run the site in your local:

```
# clone this repo
git clone git@github.com:web3-wallet/web3-wallet.git

# install dependencies
pnpm install

# start example-react
pnpm example-react
```

## Package versioning and changelogs

@web3-wallet utilizes [changeset](https://github.com/changesets/changesets) to manage the versioning and changelogs of its packages.

1. To update the version of specific packages, run `pnpm changeset`.
2. Then, run `pnpm changeset version` to apply updates of the versioning and changelogs .
3. Commit the local modifications.
4. Finally, run `pnpm release` to publish the updated packages to the npm registry.

## License

MIT
