import type { Wallet as CoreWallet } from '@web3-wallet/core';
import createReactStore from 'zustand';

import { createCoreHooks, createProviderHooks } from './hooks';
import { queryContext } from './query';
import type { Wallet } from './types';

export const createReactWallet = (coreWallet: CoreWallet): Wallet => {
  const reactStore = createReactStore(coreWallet.getStore());

  let wallet = {
    ...coreWallet,
    getReactStore: () => reactStore,
    queryContext,
  } as Wallet;

  // create and merge builtin hooks to wallet
  wallet = [createCoreHooks, createProviderHooks].reduce(
    (wallet, createHooks) => ({
      ...wallet,
      ...createHooks(wallet),
    }),
    wallet,
  );

  const plugins = coreWallet.getPlugins();

  plugins.forEach((plugin) => {
    const pluginApi = plugin({ wallet });
    coreWallet.pluginApiMap.set(plugin.pluginName, pluginApi);
  });

  return wallet;
};
