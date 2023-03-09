import type { Connector } from './Connector';
import type { Wallet } from './types';

/**
 * @param connector - The wallet connector.
 * @returns Wallet - The created public wallet api.
 */
export const createWallet = (
  connector: Connector | (() => Connector),
): Wallet => {
  const getConnector = (): Connector => {
    return typeof connector === 'function' ? connector() : connector;
  };

  const wallet: Wallet = {
    getWalletName: () => getConnector().walletName,
    getConnector,
    getStore: () => getConnector().store,
    detectProvider: () => getConnector().detectProvider(),
    connect: (...args) => getConnector().connect(...args),
    autoConnect: (...args) => getConnector().autoConnect(...args),
    disconnect: (...args) => getConnector().disconnect(...args),
    watchAsset: (...args) => getConnector().watchAsset(...args),
  };

  return wallet;
};
