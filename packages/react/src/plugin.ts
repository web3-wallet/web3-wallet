import type { Brand } from '@web3-wallet/core';

import type { Wallet } from './types';

export type PluginName<T extends string = string> = Brand<
  T,
  '@web-3wallet/react-plugin'
>;

export type WalletMiddleware = {
  connect: (wallet: Wallet) => (next: Wallet['connect']) => Wallet['connect'];
  autoConnect: (
    wallet: Wallet,
  ) => (next: Wallet['autoConnect']) => Wallet['autoConnect'];
  autoConnectOnce: (
    wallet: Wallet,
  ) => (next: Wallet['autoConnectOnce']) => Wallet['autoConnectOnce'];
  disconnect: (
    wallet: Wallet,
  ) => (next: Wallet['disconnect']) => Wallet['disconnect'];
};

export type PluginApi = object | undefined;
export interface PluginInfo<P extends PluginApi = PluginApi> {
  name: PluginName;
  dependencies?: PluginName[];
  middleware?: WalletMiddleware;
  api: P extends undefined ? never : P;
}

export type Plugin<P extends PluginApi = PluginApi> = (
  wallet: Wallet,
) => PluginInfo<P>;

export type CreatePlugin<
  O extends object = object,
  P extends PluginApi = PluginApi,
> = (options?: O) => Plugin<P>;
