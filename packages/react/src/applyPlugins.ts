import { applyMiddleWares } from './applyMiddlewares';
import type {
  Plugin,
  PluginApi,
  PluginApiMap,
  PluginName,
  Wallet,
} from './types';

/**
 * Apply plugins and update the wallet pluginApiMap
 *
 * @param plugins - the plugins to apply
 * @param wallet - the wallet on which the plugins will be applied
 * @param pluginApiMap - the applied wallet plugin apis
 * @returns a new wallet with the plugins applied to it
 */
export const applyPlugins = (
  plugins: Plugin[],
  wallet: Wallet,
  pluginApiMap: PluginApiMap,
): Wallet => {
  return plugins.reduce((prevWallet, plugin) => {
    /**
     * check for plugin duplication
     */
    if (pluginApiMap.has(plugin.name)) {
      throw new Error(`Plugin '${plugin.name}' duplicated`);
    }

    /**
     * check and retrieve the plugin dependencies
     */
    const dependencies: PluginApi[] = (plugin.dependencies ?? []).map(
      (dep: PluginName) => {
        if (!pluginApiMap.has(dep)) {
          throw new Error(
            `Plugin dependency ${dep} don't exists: ${plugin.name} depends on ${dep} `,
          );
        }
        return pluginApiMap.get(dep) as PluginApi;
      },
    );

    const pluginApi = plugin.createApi({ wallet, dependencies });

    /**
     * Apply plugin middlewares
     */
    const nextWallet = applyMiddleWares(pluginApi.middlewares, prevWallet);

    pluginApiMap.set(plugin.name, pluginApi);

    return nextWallet;
  }, wallet);
};
