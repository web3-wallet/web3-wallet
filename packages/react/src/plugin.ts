import type { Brand } from '@web3-wallet/core';

import type { Wallet } from './types';

export type PluginName<T extends string = string> = Brand<
  T,
  '@web-3wallet/plugin-react'
>;

export const walletMiddlewareNames = [
  'connect',
  'autoConnect',
  'autoConnectOnce',
  'disconnect',
] as const;

export type WalletMiddlewareName = typeof walletMiddlewareNames[number];

/**
 * May expose other APIs to PluginContext later on
 */
export type MiddlewareContext = {
  wallet: Wallet;
};

export type WalletMiddlewares = Partial<{
  [K in WalletMiddlewareName]: (
    context: MiddlewareContext,
  ) => (next: Wallet[K]) => Wallet[K];
}>;

export type PluginApi = object | undefined;

export interface PluginInfo<P extends PluginApi = PluginApi> {
  name: PluginName;
  dependencies?: PluginName[];
  middlewares?: WalletMiddlewares;
  api: P extends undefined ? never : P;
}

/**
 * May expose other APIs to PluginContext later on
 */
export type PluginContext = {
  wallet: Wallet;
};

export type Plugin<P extends PluginApi = PluginApi> = (
  context: PluginContext,
) => PluginInfo<P>;

export type CreatePlugin<
  O extends object = object,
  P extends PluginApi = PluginApi,
> = (options?: O) => Plugin<P>;
