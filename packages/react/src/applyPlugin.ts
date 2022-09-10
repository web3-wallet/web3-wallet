import type { ApplyPlugin, Plugin, Wallet } from './types';

export const applyPlugin: ApplyPlugin = (wallet: Wallet, plugin: Plugin) => {
  const { name, next, api } = plugin(wallet);
  const { plugin: _plugin, ...rest } = wallet;

  return {
    ...{
      ...rest,
      ...next,
    },
    plugin: {
      ...(_plugin as object),
      [name]: api,
    },
  };
};

export const applyPlugins = (wallet: Wallet, plugins: Plugin[]): Wallet => {
  let outputWallet = wallet;

  for (const plugin of plugins) {
    outputWallet = applyPlugin(wallet, plugin);
  }

  return outputWallet;
};
