import type { Networkish } from '@ethersproject/networks';
import type { BaseProvider, Web3Provider } from '@ethersproject/providers';
import type { AbstractConnector, State, Store } from '@web3-wallet/core';
import type { ComputedRef } from 'vue';

export interface Wallet<
  Connector extends AbstractConnector = AbstractConnector,
> {
  store: Store;
  connector: Connector;
  name: Connector['name'];
  chainId: ComputedRef<State['chainId']>;
  accounts: ComputedRef<State['accounts']>;
  isConnecting: ComputedRef<State['isConnecting']>;
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
