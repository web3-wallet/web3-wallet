import type {
  Brand,
  Connector,
  WalletName,
  WalletStore,
  WalletStoreActions,
} from '@web3-wallet/core';

export interface VanillaWallet {
  name: WalletName;

  $getStore: () => WalletStore;
  $getActions: () => WalletStoreActions;

  connect: Connector['connect'];
  autoConnect: Connector['autoConnect'];
  autoConnectOnce: Connector['autoConnectOnce'];
  disconnect: Connector['disconnect'];
  watchAsset: Connector['watchAsset'];

  plugin: unknown;
}

export type PluginName<T extends string = string> = Brand<T, 'PluginName'>;

export interface VanillaPluginApi<T extends object = object> {
  name: PluginName;
  dependencies?: PluginName[];
  next: Partial<Omit<VanillaWallet, 'name'>>;
  api: T;
}

export type VanillaPlugin<T extends object = object> = (
  wallet: VanillaWallet,
) => VanillaPluginApi<T>;

export type CreateVanillaPlugin<T extends object, K extends object> = (
  options?: T,
) => VanillaPlugin<K>;

export type ApplyVanillaPlugin = (
  wallet: VanillaWallet,
  plugin: VanillaPlugin,
) => VanillaWallet;
