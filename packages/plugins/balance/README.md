# Balance

## Install

```bash
pnpm add @web3-wallet/plugin-balance
```

## Usage

```ts
import { MetaMask } from '@web3-wallet/metamask';
import { BalancePlugin } from '@web3-wallet/plugin-balance';

const wallet = createWallet(new MetaMask(), {
  plugins: [BalancePlugin.create()],
});

const { useBalance } = wallet.getPlugin<BalancePlugin.Api>(BalancePlugin.name);

const { data: balance, ...rest } = useBalance();
```

useBalance is wrapped with [useQuery](https://tanstack.com/query/v4/docs/reference/useQuery).
