import type { QueryClient } from '@tanstack/react-query';
import type {
  Connector,
  CurrentWallet as CoreCurrentWallet,
  CurrentWalletState,
  Plugin as CorePlugin,
  Wallet as CoreWallet,
  WalletConnectionStatus,
  WalletName,
  WalletState,
} from '@web3-wallet/core';
import type { Context } from 'react';
import type { StoreApi, UseBoundStore } from 'zustand';

import type { BuiltinHooks } from './hooks';
import type { WrappedUseMutation } from './query';

export {
  AddEthereumChainParameter,
  Connector,
  CurrentWalletState,
  PluginName,
  Provider,
  WalletConnectionStatus,
  WalletName,
  WalletState,
} from '@web3-wallet/core';

export interface Wallet extends CoreWallet, BuiltinHooks {
  queryContext: Context<QueryClient | undefined>;
  getReactStore: () => UseBoundStore<StoreApi<WalletState>>;
}
export interface CurrentWallet extends CoreCurrentWallet, BuiltinHooks {
  useName: () => WalletName;
  getReactStore: () => UseBoundStore<StoreApi<CurrentWalletState>>;
  useConnectionStatus: () => WalletConnectionStatus;
  useConnectAsCurrentWallet: WrappedUseMutation<
    void,
    unknown,
    { walletName: WalletName; chain?: Parameters<Connector['connect']>[0] }
  >;
}

export type PluginContext = {
  wallet: Omit<Wallet, 'getStore' | 'getReactStore'>;
};

export type Plugin<PluginApi = unknown> = CorePlugin<PluginApi, PluginContext>;
