import type { StoreApi, UseBoundStore } from 'zustand';

import type { Connector } from '../Connector';
import type { Brand } from './utils';

/**
 * The minimal WalletState to keep track with
 */
export interface WalletState {
  isConnecting: boolean;
  chainId?: number;
  accounts?: string[];
}

/**
 * WalletStore is for managing the state of WalletState
 */
export type WalletStore = UseBoundStore<StoreApi<WalletState>>;

/**
 * WalletStoreActions is used to update the WalletStore
 */
export interface WalletStoreActions {
  startConnection: () => () => void;
  update: (stateUpdate: Partial<Omit<WalletState, 'isConnecting'>>) => void;
  resetState: () => void;
}

/**
 * Each wallet must have unique wallet name, wallet name is served as the wallet id.
 **/
export type WalletName<T extends string = string> = Brand<T, 'WalletName'>;

/**
 * The public wallet api
 */
export interface Wallet {
  getWalletName: () => WalletName;
  getStore: () => WalletStore;
  getConnector: () => Connector;
  detectProvider: () => ReturnType<Connector['detectProvider']>;
  connect: Connector['connect'];
  autoConnect: Connector['autoConnect'];
  disconnect: Connector['disconnect'];
  watchAsset: Connector['watchAsset'];
}

export type CurrentWalletState = WalletState & {
  walletName: WalletName;
  connectionStatus: WalletConnectionStatus;
};

export type CurrentWalletStore = UseBoundStore<StoreApi<CurrentWalletState>>;

export enum WalletConnectionStatus {
  Untouched = 'Untouched',
  Connected = 'Connected',
  Disconnected = 'Disconnected',
}

export interface CurrentWallet extends Wallet {
  getStore: () => CurrentWalletStore;
  switchCurrentWallet: (walletName: WalletName) => void;
  connectAsCurrentWallet: (
    walletName: WalletName,
    ...args: Parameters<Connector['connect']>
  ) => ReturnType<Connector['connect']>;
}
