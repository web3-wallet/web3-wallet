import type { Connector } from './Connector';
import type { WalletStore } from './createWalletStore';
import type { Provider } from './provider';
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

  $getStore: () => WalletStore;
  $getProvider: () => Provider | undefined;
  detectProvider: () => ReturnType<Connector['detectProvider']>;

  // core methods
  connect: Connector['connect'];
  autoConnect: Connector['autoConnect'];
  autoConnectOnce: Connector['autoConnectOnce'];
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

    $getProvider: () => connector.provider,
    $getStore: () => connector.store,
    detectProvider: () => connector.detectProvider(),

    connect: (...args) => connector.connect(...args),
    autoConnect: (...args) => connector.autoConnect(...args),
    autoConnectOnce: (...args) => connector.autoConnectOnce(...args),
    disconnect: (...args) => connector.disconnect(...args),
    watchAsset: (...args) => connector.watchAsset(...args),
  };

  return wallet;
};
