import type {
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
}
