import type { Connector } from '@web3-wallet/core';

import type { VanillaWallet } from './types';

/**
 * @typeParam Connector - The wallet connector.
 * @returns Wallet - The created vanilla wallet api.
 */
export const createVanillaWallet = (connector: Connector): VanillaWallet => {
  return {
    name: connector.name,

    $getStore: () => connector.store,
    $getActions: () => connector.actions,

    connect: (...args) => connector.connect(...args),
    autoConnect: (...args) => connector.autoConnect(...args),
    autoConnectOnce: (...args) => connector.autoConnectOnce(...args),
    disconnect: (...args) => connector.disconnect(...args),
    watchAsset: (...args) => connector.watchAsset(...args),
  };
};
