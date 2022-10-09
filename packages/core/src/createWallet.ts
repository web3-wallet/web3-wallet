import type { Connector } from './Connector';
import type { Plugin, PluginApiMap, PluginName, Wallet } from './types';

export type CreateWalletOptions = {
  plugins?: Plugin[];
};

/**
 * @param connector - The wallet connector.
 * @returns Wallet - The created public wallet api.
 */
export const createWallet = (
  connector: Connector | (() => Connector),
  options?: CreateWalletOptions,
): Wallet => {
  const getConnector = (): Connector => {
    return typeof connector === 'function' ? connector() : connector;
  };

  const pluginApiMap: PluginApiMap = new Map();

  const wallet: Wallet = {
    getName: () => getConnector().name,
    getPlugins: () => options?.plugins ?? [],
    getConnector,
    getStore: () => getConnector().store,
    detectProvider: () => getConnector().detectProvider(),
    connect: (...args) => getConnector().connect(...args),
    autoConnect: (...args) => getConnector().autoConnect(...args),
    disconnect: (...args) => getConnector().disconnect(...args),
    watchAsset: (...args) => getConnector().watchAsset(...args),
    pluginApiMap,
    getPluginApi: <PluginApi>(pluginName: PluginName): PluginApi => {
      if (!pluginApiMap.has(pluginName)) {
        throw new Error(`Plugin ${pluginName} don't exists!`);
      }
      return pluginApiMap.get(pluginName) as PluginApi;
    },
  };

  return wallet;
};
