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
 * May expose specific context to middleware later on
 */
export type MiddlewareContext = object;

export type WalletMiddlewares = Partial<{
  [K in WalletMiddlewareName]: (
    context: MiddlewareContext,
  ) => (next: Wallet[K]) => Wallet[K];
}>;

export type PluginApi = {
  hooks?: object;
};

/**
 * May expose other APIs to PluginContext later on
 */
export type PluginContext = {
  wallet: Wallet;
  dependencies?: unknown[];
};

export interface Plugin<P extends PluginApi = PluginApi> {
  name: PluginName;
  dependencies?: PluginName[];
  createApi: (context: PluginContext) => P & {
    middlewares?: WalletMiddlewares;
  };
}

export type CreatePlugin<
  O extends object | undefined = undefined,
  P extends PluginApi = PluginApi,
> = (options?: O) => Plugin<P>;
