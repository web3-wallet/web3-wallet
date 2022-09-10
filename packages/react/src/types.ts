import type { Networkish } from '@ethersproject/networks';
import type { BaseProvider, Web3Provider } from '@ethersproject/providers';
import type { WalletName, WalletState } from '@web3-wallet/core';
import type { PluginName, VanillaWallet } from '@web3-wallet/vanilla';

export interface Wallet extends VanillaWallet {
  $getVanillaWallet: () => VanillaWallet;

  useChainId: () => WalletState['chainId'];
  useAccounts: () => WalletState['accounts'];
  useAccount: () => string | undefined;
  useUserConnectionStatus: () => WalletState['userConnectionStatus'];
  useIsConnecting: () => WalletState['isConnecting'];
  useIsConnected: () => boolean;
  useProvider: <T extends BaseProvider = Web3Provider>(
    network?: Networkish,
    enabled?: boolean,
  ) => T | undefined;
  useENSNames: (provider?: BaseProvider) => (string | undefined)[];
  useENSName: (provider?: BaseProvider) => undefined | string;
}

export type WalletHooks = Pick<
  Wallet,
  | 'useChainId'
  | 'useAccount'
  | 'useAccounts'
  | 'useUserConnectionStatus'
  | 'useIsConnecting'
  | 'useIsConnected'
  | 'useProvider'
  | 'useENSNames'
  | 'useENSName'
>;

export type CurrentWalletState = Pick<WalletState, 'userConnectionStatus'> & {
  currentWallet: WalletName;
};

export type CurrentWallet = Omit<
  Wallet,
  'name' | '$getStore' | '$getActions'
> & {
  wallets: Wallet[];
  setCurrentWallet: (walletName: WalletName) => void;
  useName: () => Wallet['name'];
};

export interface PluginApi<T extends object> {
  name: PluginName;
  dependencies?: PluginName[];
  next: Partial<Omit<Wallet, 'name'>>;
  api: T;
}

export type Plugin<T extends object = object> = (
  wallet: Wallet,
) => PluginApi<T>;

export type CreatePlugin<
  T extends object = object,
  K extends object = object,
> = (options?: T) => Plugin<K>;

export type ApplyPlugin = (wallet: Wallet, plugin: Plugin) => Wallet;
