import type { Networkish } from '@ethersproject/networks';
import type { BaseProvider, Web3Provider } from '@ethersproject/providers';
import type { Connector, WalletName, WalletState } from '@web3-wallet/core';

export interface Wallet<C extends Connector = Connector> {
  name: WalletName;
  connector: C;
  /**
   * methods
   */
  connect: C['connect'];
  autoConnect: C['autoConnect'];
  autoConnectOnce: C['autoConnectOnce'];
  disconnect: C['disconnect'];

  /**
   * hooks
   */
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

export type CurrentWallet = Omit<Wallet, 'name' | 'connector'> & {
  wallets: Wallet[];
  setCurrentWallet: (walletName: WalletName) => void;
  useConnector: () => Wallet['connector'];
  useName: () => Wallet['name'];
};
