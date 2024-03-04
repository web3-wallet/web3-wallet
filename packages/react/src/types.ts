import type {
  CurrentWallet as CoreCurrentWallet,
  Wallet as CoreWallet,
  WalletConnectionStatus,
  WalletName,
} from '@react-web3-wallet/core';

import type { BuiltinHooks } from './hooks';

export {
  AddEthereumChainParameter,
  Connector,
  CurrentWalletState,
  Provider,
  WalletConnectionStatus,
  WalletName,
  WalletState,
  WatchAssetParameters,
} from '@react-web3-wallet/core';

export type Wallet = BuiltinHooks & CoreWallet;
export interface CurrentWallet extends CoreCurrentWallet, BuiltinHooks {
  useWalletName: () => WalletName;
  useConnectionStatus: () => WalletConnectionStatus;
}
