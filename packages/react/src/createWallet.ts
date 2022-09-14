import {
  type Connector,
  createWallet as createCoreWallet,
} from '@web3-wallet/core';
import createReactStore from 'zustand';

import { getAugmentedHooks, getDerivedHooks, getStateHooks } from './hooks';
import { CoreHooks } from './plugins/core-hooks';
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

  const stateHooks = getStateHooks(reactStore);
  const derivedHooks = getDerivedHooks(stateHooks);
  const augmentedHooks = getAugmentedHooks(connector, stateHooks, derivedHooks);

  const wallet = {
    ...coreWallet,
    $getStore: () => reactStore,
    ...augmentedHooks,
  };

  const { createApi } = CoreHooks.createPlugin();

  return {
    ...wallet,
    ...createApi({
      wallet: wallet as unknown as Wallet,
    }).hooks,
  };
};
