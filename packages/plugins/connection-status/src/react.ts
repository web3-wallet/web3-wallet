import type { CreatePlugin, Wallet } from '@web3-wallet/react';
import createReactStore from 'zustand';

import type {
  ConnectionStatus,
  VanillaConnectionStatusPluginOptions,
} from './vanilla';
import { createVanillaConnectionStatusPlugin } from './vanilla';

export type ConnectionStatusPluginApi = {
  useConnectionStatus: () => ConnectionStatus;
};

export const createConnectionStatusPlugin: CreatePlugin<
  VanillaConnectionStatusPluginOptions,
  ConnectionStatusPluginApi
> = (options) => (wallet: Wallet) => {
  const vanillaConnectionStatusPlugin = createVanillaConnectionStatusPlugin(
    options,
  )(wallet.$getVanillaWallet());

  const reactStore = createReactStore(vanillaConnectionStatusPlugin.api.store);
  const useConnectionStatus: ConnectionStatusPluginApi['useConnectionStatus'] =
    () => {
      return reactStore((s) => s.connectionStatus);
    };

  return {
    ...vanillaConnectionStatusPlugin,
    api: {
      useConnectionStatus,
    },
  };
};
