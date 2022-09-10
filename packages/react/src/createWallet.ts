import type { Connector } from '@web3-wallet/core';
import { createConnectionStatusPlugin } from '@web3-wallet/plugin-connection-status';
import { createVanillaWallet } from '@web3-wallet/vanilla';
import createReactStore from 'zustand';

import { applyPlugins } from './applyPlugin';
import { getAugmentedHooks, getDerivedHooks, getStateHooks } from './hooks';
import type { Plugin, Wallet } from './types';

/**
 * @typeParam connector - The wallet connector.
 * @returns Wallet - The created React wallet api.
 */
export const createWallet = (
  connector: Connector,
  plugins: Plugin[] = [],
): Wallet => {
  const vanillaWallet = createVanillaWallet(connector);

  const reactStore = createReactStore(vanillaWallet.$getStore());

  const stateHooks = getStateHooks(reactStore);
  const derivedHooks = getDerivedHooks(stateHooks);
  const augmentedHooks = getAugmentedHooks(connector, stateHooks, derivedHooks);

  const wallet = {
    $getVanillaWallet: () => vanillaWallet,
    ...vanillaWallet,
    ...stateHooks,
    ...derivedHooks,
    ...augmentedHooks,
  };
  const connectionStatusPlugin = createConnectionStatusPlugin();

  return applyPlugins(wallet, [connectionStatusPlugin, ...plugins]);
};
