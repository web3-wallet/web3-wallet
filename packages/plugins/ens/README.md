# Ens

## Install

```bash
pnpm add @web3-wallet/plugin-ens
```

## Usage

```ts
import { MetaMask } from '@web3-wallet/metamask';
import { EnsPlugin } from '@web3-wallet/plugin-balance';

const wallet = createWallet(new MetaMask(), {
  plugins: [EnsPlugin.create()],
});

const { useEnsName } = wallet.getPlugin<EnsPlugin.Api>(EnsPlugin.name);

const { data: ensName, ...rest } = useEnsName();
```

useEnsName is wrapped with [useQuery](https://tanstack.com/query/v4/docs/reference/useQuery).
