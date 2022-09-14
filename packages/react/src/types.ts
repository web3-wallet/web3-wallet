import type { Networkish } from '@ethersproject/networks';
import type { BaseProvider, Web3Provider } from '@ethersproject/providers';
import type {
  Wallet as CoreWallet,
  WalletName,
  WalletState,
} from '@web3-wallet/core';

import type { PluginApi, PluginName } from './plugin';

export interface Wallet extends CoreWallet {
  getPlugin: <T extends PluginApi = PluginApi>(pluginName: PluginName) => T;

  useIsConnecting: () => WalletState['isConnecting'];
  useChainId: () => WalletState['chainId'];
  useAccounts: () => WalletState['accounts'];
  useAccount: () => string | undefined;
  useIsConnected: () => boolean;
  useProvider: <T extends BaseProvider = Web3Provider>(
    network?: Networkish,
    enabled?: boolean,
  ) => T | undefined;
  useENSNames: (provider?: BaseProvider) => (string | undefined)[];
  useENSName: (provider?: BaseProvider) => undefined | string;
}

export type WalletCoreHooks = Pick<
  Wallet,
  | 'useIsConnecting'
  | 'useChainId'
  | 'useAccounts'
  | 'useAccount'
  | 'useIsConnected'
  | 'useProvider'
  | 'useENSNames'
  | 'useENSName'
>;

export enum ConnectionStatus {
  Untouched = 'Untouched',
  Connected = 'Connected',
  Disconnected = 'Disconnected',
}

export type CurrentWalletState = {
  currentWallet: WalletName;
  connectionStatus: ConnectionStatus;
};

export type CurrentWallet = Omit<Wallet, 'name'> & {
  switchCurrentWallet: (name: WalletName) => void;
  useName: () => Wallet['name'];
  useConnectionStatus: () => ConnectionStatus;
  /**
   * usePlugin has the same signature as getPlugin
   */
  usePlugin: Wallet['getPlugin'];
};
