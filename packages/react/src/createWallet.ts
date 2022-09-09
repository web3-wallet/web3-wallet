import type { Connector } from '@web3-wallet/core';
import { createVanillaWallet } from '@web3-wallet/vanilla';
import createReactStore from 'zustand';

import { getAugmentedHooks, getDerivedHooks, getStateHooks } from './hooks';
import type { Wallet } from './types';

/**
 * @typeParam connector - The wallet connector.
 * @returns Wallet - The created React wallet api.
 */
export const createWallet = (connector: Connector): Wallet => {
  const vanillaWallet = createVanillaWallet(connector);

  const reactStore = createReactStore(vanillaWallet.$getStore());

  const stateHooks = getStateHooks(reactStore);
  const derivedHooks = getDerivedHooks(stateHooks);
  const augmentedHooks = getAugmentedHooks(connector, stateHooks, derivedHooks);

  return {
    ...vanillaWallet,
    ...stateHooks,
    ...derivedHooks,
    ...augmentedHooks,
  };
};
