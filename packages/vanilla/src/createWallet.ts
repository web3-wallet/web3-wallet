import type { Connector } from '@web3-wallet/core';

import { applyVanillaPlugins } from './applyPlugin';
import type { VanillaPlugin, VanillaWallet } from './types';

/**
 * @typeParam Connector - The wallet connector.
 * @returns Wallet - The created vanilla wallet api.
 */
export const createVanillaWallet = (
  connector: Connector,
  plugins: VanillaPlugin[] = [],
): VanillaWallet => {
  const wallet: VanillaWallet = {
    name: connector.name,

    $getStore: () => connector.store,
    $getActions: () => connector.actions,

    connect: (...args) => connector.connect(...args),
    autoConnect: (...args) => connector.autoConnect(...args),
    autoConnectOnce: (...args) => connector.autoConnectOnce(...args),
    disconnect: (...args) => connector.disconnect(...args),
    watchAsset: (...args) => connector.watchAsset(...args),
    plugin: {},
  };

  return applyVanillaPlugins(wallet, plugins);
};
