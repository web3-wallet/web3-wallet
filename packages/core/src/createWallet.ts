import type { Connector } from './Connector';
import type { WalletStore } from './createWalletStore';
import type { Brand } from './utilTypes';

/**
 * Each wallet must have unique wallet name, wallet name is served as the wallet id.
 **/
export type WalletName<T extends string = string> = Brand<T, 'WalletName'>;

/**
 * The public wallet api
 */
export interface Wallet {
  name: WalletName;

  getStore: () => WalletStore;

  connector: Connector;
  detectProvider: () => ReturnType<Connector['detectProvider']>;
  connect: Connector['connect'];
  autoConnect: Connector['autoConnect'];
  disconnect: Connector['disconnect'];
  watchAsset: Connector['watchAsset'];
}

/**
 * @param connector - The wallet connector.
 * @returns Wallet - The created public wallet api.
 */
export const createWallet = (connector: Connector): Wallet => {
  const wallet: Wallet = {
    name: connector.name,

    connector,
    getStore: () => connector.store,
    detectProvider: () => connector.detectProvider(),

    connect: (...args) => connector.connect(...args),
    autoConnect: (...args) => connector.autoConnect(...args),
    disconnect: (...args) => connector.disconnect(...args),
    watchAsset: (...args) => connector.watchAsset(...args),
  };

  return wallet;
};
