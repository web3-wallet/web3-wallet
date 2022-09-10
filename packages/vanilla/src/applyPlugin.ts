import type { ApplyVanillaPlugin, VanillaPlugin, VanillaWallet } from './types';

export const applyVanillaPlugin: ApplyVanillaPlugin = (
  wallet: VanillaWallet,
  plugin: VanillaPlugin,
) => {
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

export const applyVanillaPlugins = (
  wallet: VanillaWallet,
  plugins: VanillaPlugin[],
): VanillaWallet => {
  let outputWallet = wallet;

  for (const plugin of plugins) {
    outputWallet = applyVanillaPlugin(wallet, plugin);
  }

  return outputWallet;
};
