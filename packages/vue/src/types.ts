import type { Networkish } from '@ethersproject/networks';
import type { BaseProvider, Web3Provider } from '@ethersproject/providers';
import type { WalletState } from '@web3-wallet/core';
import type { VanillaWallet } from '@web3-wallet/vanilla';
import type { ComputedRef } from 'vue';

export interface Wallet extends VanillaWallet {
  chainId: ComputedRef<WalletState['chainId']>;
  accounts: ComputedRef<WalletState['accounts']>;
  isConnecting: ComputedRef<WalletState['isConnecting']>;
  account: ComputedRef<string | undefined>;
  isConnected: ComputedRef<boolean>;
  useProvider: <T extends BaseProvider = Web3Provider>(
    network?: Networkish,
  ) => ComputedRef<T | undefined>;
  useEnsNames: (
    provider: ComputedRef<BaseProvider | undefined>,
  ) => ComputedRef<(string | undefined)[]>;
  useEnsName: (
    provider: ComputedRef<BaseProvider | undefined>,
  ) => ComputedRef<undefined | string>;
}
