import type { WalletName } from 'packages/core/dist/esm';

import { applyWalletMiddleWares } from './applyWalletMiddlewares';
import type { Plugin, PluginApi, PluginName } from './plugin';
import type { Wallet } from './types';

export type CacheOfAppliedPlugins = Map<WalletName, Map<PluginName, PluginApi>>;

/**
 * Apply plugins and update the cache of the applied plugins
 *
 * @param plugins - the plugins to apply
 * @param wallet - the wallet on which the plugins will be applied
 * @param cache - the cache of the applied plugins
 * @returns a new wallet with the plugins applied.
 */
export const applyPlugins = (
  plugins: Plugin[],
  wallet: Wallet,
  cache: CacheOfAppliedPlugins,
): Wallet => {
  return plugins.reduce((previousWallet, plugin) => {
    /**
     * check for plugin duplication
     */
    if (cache.get(wallet.name)?.has(plugin.name)) {
      throw new Error(`Plugin '${plugin.name}' duplicated`);
    }

    /**
     * check and retrieve the plugin dependencies
     */
    const dependencies: PluginApi[] = (plugin.dependencies ?? []).map(
      (dep: PluginName) => {
        if (!cache.get(wallet.name)?.has(dep)) {
          throw new Error(
            `Plugin dependency ${dep} don't exists: ${plugin.name} depends on ${dep} `,
          );
        }
        return cache.get(wallet.name)?.get(dep) as PluginApi;
      },
    );

    const pluginApi = plugin.createApi({ wallet, dependencies });

    /**
     * Apply plugin middlewares
     */
    const nextWallet = applyWalletMiddleWares(
      pluginApi.middlewares,
      previousWallet,
    );

    /**
     * update the appliedPluginMap cache
     */
    if (!cache.has(wallet.name)) {
      cache.set(wallet.name, new Map<PluginName, PluginApi>());
    }

    cache.get(wallet.name)?.set(plugin.name, pluginApi);

    return nextWallet;
  }, wallet);
};
