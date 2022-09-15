import {
  type Connector,
  createWallet as createCoreWallet,
} from '@web3-wallet/core';
import createReactStore from 'zustand';

import { applyPlugins } from './applyPlugins';
import type {
  Plugin,
  PluginApi,
  PluginApiCache,
  PluginName,
  Wallet,
} from './types';
import { builtinPlugins } from './types';

/**
 * @typeParam connector - The wallet connector.
 * @returns Wallet - The created React wallet api.
 */
export const createWallet = (
  connector: Connector,
  plugins?: Plugin[],
): Wallet => {
  const coreWallet = createCoreWallet(connector);

  const reactStore = createReactStore(coreWallet.$getStore());

  const cache: PluginApiCache = new Map();

  let wallet = {
    ...coreWallet,
    $getStore: () => reactStore,
    getPlugin: <T extends PluginApi = PluginApi>(pluginName: PluginName) => {
      if (!cache.has(pluginName)) {
        throw new Error(`Plugin ${pluginName} don't exists!`);
      }

      return cache.get(pluginName) as T;
    },
  } as Wallet;

  // merge builtin plugin hooks to wallet
  wallet = builtinPlugins.reduce(
    (wallet, plugin) => ({
      ...wallet,
      ...plugin.createApi({ wallet }).hooks,
    }),
    wallet,
  );

  if (!plugins || !plugins.length) return wallet;

  return applyPlugins(plugins, wallet, cache);
};
