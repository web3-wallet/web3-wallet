# Plugin

At it's core, web3-wallet only handle wallet/provider connection. Plugins are modules that are loosely coupled with the web3-wallet core. Plugin let us extend the web3-wallet easily.

A plugin is a function that takes a plugin context as it's input and outputs a plugin api.

```ts
export type PluginContext = {
  wallet: Wallet;
};

export type Plugin<TPluginApi = any, TPluginContext = PluginContext> = {
  (context: TPluginContext): TPluginApi;
  pluginName: PluginName;
};
```

Plugins are fed to `createWallet` or `createCurrentWallet`:

```ts
import { MetaMask } from '@web3-wallet/metamask';
import { DefiWallet } from '@web3-wallet/defiwallet';
import { createWallet, createCurrentWallet } from '@web3-wallet/react';
import { EnsPlugin } from '@web3-wallet/plugin-ens';
import { BalancePlugin } from '@web3-wallet/plugin-balance';

const plugins = [EnsPlugin.create(), BalancePlugin.create()];

const wallet = createWallet(new MetaMask(), {
  plugins,
});

const currentWallet = new createCurrentWallet(
  [new MetaMask(), new DefiWallet()],
  { plugins },
);

const { useEnsName } = wallet.getPlugin<EnsPlugin.Api>(EnsPlugin.pluginName);

const { data: ensName, ...rest } = useEnsName();

const { useBalance } = currentWallet.getPlugin<BalancePlugin.Api>(
  BalancePlugin.pluginName,
);

const { data: balance, ...rest } = useBalance();
```

useEnsName and useBalance are wrapped with [useQuery](https://tanstack.com/query/v4/docs/reference/useQuery).
