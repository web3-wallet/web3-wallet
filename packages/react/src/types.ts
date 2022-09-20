import type {
  Brand,
  Wallet as CoreWallet,
  WalletName,
  WalletState,
} from '@web3-wallet/core';
import type { StoreApi, UseBoundStore } from 'zustand';

import { CoreHooksPlugin } from './plugins/core-hooks';
import { Web3ProviderPlugin } from './plugins/web3-provider';

export interface Wallet extends CoreWallet, WalletBuiltinHooks {
  $getStore: () => UseBoundStore<StoreApi<WalletState>>;
  getPlugin: <T extends PluginApi = PluginApi>(pluginName: PluginName) => T;
}

/**
 * The dependencies of the builtin plugins are not checked, don't mix up orders.
 */
export const builtinPlugins = [
  CoreHooksPlugin.create(),
  Web3ProviderPlugin.create(),
];

export type WalletBuiltinHooks = CoreHooksPlugin.Api['hooks'] &
  Web3ProviderPlugin.Api['hooks'];

export type CurrentWallet = Omit<Wallet, 'name'> & {
  switchCurrentWallet: (name: WalletName) => void;
  useName: () => Wallet['name'];
  useConnectionStatus: () => WalletConnectionStatus;

  connectWith: (
    name: WalletName,
    ...args: Parameters<Wallet['connect']>
  ) => ReturnType<Wallet['connect']>;
  autoConnectWith: (
    name: WalletName,
    ...args: Parameters<Wallet['autoConnect']>
  ) => ReturnType<Wallet['autoConnect']>;
  autoConnectOnceWith: (
    name: WalletName,
    ...args: Parameters<Wallet['autoConnectOnce']>
  ) => ReturnType<Wallet['autoConnectOnce']>;
  disconnectWith: (
    name: WalletName,
    ...args: Parameters<Wallet['disconnect']>
  ) => ReturnType<Wallet['disconnect']>;
  watchAssetWith: (
    name: WalletName,
    ...args: Parameters<Wallet['watchAsset']>
  ) => ReturnType<Wallet['watchAsset']>;

  /**
   * usePlugin has the same signature as getPlugin
   */
  usePlugin: Wallet['getPlugin'];
};

export type CurrentWalletState = {
  name: WalletName;
  connectionStatus: WalletConnectionStatus;
};

export enum WalletConnectionStatus {
  Untouched = 'Untouched',
  Connected = 'Connected',
  Disconnected = 'Disconnected',
}

export type PluginName<T extends string = string> = Brand<
  T,
  '@web-3wallet/plugin-react'
>;

export type PluginApiCache = Map<PluginName, PluginApi>;

export type CreatePlugin<
  O extends object | undefined = undefined,
  P extends PluginApi = PluginApi,
> = (options?: O) => Plugin<P>;

export interface Plugin<P extends PluginApi = PluginApi> {
  name: PluginName;
  dependencies?: PluginName[];
  createApi: (context: PluginContext) => P & {
    middlewares?: Middlewares;
  };
}

export type PluginContext = {
  wallet: Wallet;
  dependencies?: unknown[];
};

export type PluginApi = {
  hooks?: object;
};

export const middlewareNames = [
  'connect',
  'autoConnect',
  'autoConnectOnce',
  'disconnect',
] as const;

export type MiddlewareName = typeof middlewareNames[number];

export type MiddlewareContext = object;

export type Middlewares = Partial<{
  [K in MiddlewareName]: (
    context: MiddlewareContext,
  ) => (next: Wallet[K]) => Wallet[K];
}>;

export type AsyncFetchResult<T = unknown> = {
  data?: T;
  error?: Error;
  isLoading: boolean;
};
