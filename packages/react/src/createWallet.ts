import {
  type Connector,
  createWallet as createCoreWallet,
} from '@web3-wallet/core';
import { useMemo } from 'react';
import createReactStore from 'zustand';

import { applyPlugins } from './applyPlugins';
import type {
  Plugin,
  PluginApi,
  PluginApiMap,
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

  const pluginApiMap: PluginApiMap = new Map();

  let wallet = {
    ...coreWallet,
    $pluginApiMap: pluginApiMap,
    $getStore: () => reactStore,
    usePlugin: <T extends PluginApi = PluginApi>(pluginName: PluginName) => {
      return useMemo(() => {
        if (!pluginApiMap.has(pluginName)) {
          throw new Error(`Plugin ${pluginName} don't exists!`);
        }

        return pluginApiMap.get(pluginName) as T;
      }, [pluginName]);
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

  return applyPlugins(plugins, wallet, pluginApiMap);
};
