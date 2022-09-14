import type {
  Wallet as CoreWallet,
  WalletName,
  WalletState,
} from '@web3-wallet/core';
import type { StoreApi, UseBoundStore } from 'zustand';

import type { PluginApi, PluginName } from './plugin';
import type { CoreHooksPlugin } from './plugins/core-hooks';
import type { ENSPlugin } from './plugins/ens';
import type { Web3ProviderPlugin } from './plugins/web3-provider';

export type WalletBuiltinHooks = CoreHooksPlugin.Api['hooks'] &
  Web3ProviderPlugin.Api['hooks'] &
  ENSPlugin.Api['hooks'];

export interface Wallet extends CoreWallet, WalletBuiltinHooks {
  $getStore: () => UseBoundStore<StoreApi<WalletState>>;
  getPlugin: <T extends PluginApi = PluginApi>(pluginName: PluginName) => T;
}

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
