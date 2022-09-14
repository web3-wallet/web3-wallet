import {
  type Connector,
  createWallet as createCoreWallet,
} from '@web3-wallet/core';
import createReactStore from 'zustand';

import { builtinPlugins } from './builtPlugins';
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
