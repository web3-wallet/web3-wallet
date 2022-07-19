import type { Networkish } from '@ethersproject/networks';
import type { BaseProvider } from '@ethersproject/providers';
import { Connector, State, Store } from '@web3-wallet/ethereum';
import { ComputedRef } from 'vue';

export type Wallet<T extends Connector = Connector> = {
  store: Store;
  connector: T;
  chainId: ComputedRef<State['chainId']>;
  accounts: ComputedRef<State['accounts']>;
  isActivating: ComputedRef<State['isActivating']>;
  account: ComputedRef<string | undefined>;
  isActive: ComputedRef<boolean>;
  getProvider: (
    network?: Networkish,
    enabled?: boolean,
  ) => ComputedRef<BaseProvider | undefined>;
  getEnsNames: (
    provider: ComputedRef<BaseProvider | undefined>,
  ) => ComputedRef<undefined[] | (string | null)[]>;
  getEnsName: (
    provider: ComputedRef<BaseProvider | undefined>,
  ) => ComputedRef<undefined | string | null>;
};
