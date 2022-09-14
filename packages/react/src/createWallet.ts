import {
  type Connector,
  createWallet as createCoreWallet,
} from '@web3-wallet/core';
import createReactStore from 'zustand';

import { CoreHooksPlugin } from './plugins/core-hooks';
import { ENSPlugin } from './plugins/ens';
import { Web3ProviderPlugin } from './plugins/web3-provider';
import type { Wallet } from './types';

/**
 * @typeParam connector - The wallet connector.
 * @returns Wallet - The created React wallet api.
 */
export const createWallet = (
  connector: Connector,
): Omit<Wallet, 'getPlugin'> => {
  const coreWallet = createCoreWallet(connector);

  const reactStore = createReactStore(coreWallet.$getStore());

  const builtinPlugins = [
    CoreHooksPlugin.createPlugin(),
    Web3ProviderPlugin.createPlugin(),
    ENSPlugin.createPlugin(),
  ];

  const wallet = {
    ...coreWallet,
    $getStore: () => reactStore,
  } as Wallet;

  // merge builtin plugin hooks to wallet
  return builtinPlugins.reduce(
    (wallet, plugin) => ({
      ...wallet,
      ...plugin.createApi({ wallet }).hooks,
    }),
    wallet,
  );
};
