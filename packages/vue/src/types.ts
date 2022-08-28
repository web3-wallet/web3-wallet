import type { Networkish } from '@ethersproject/networks';
import type { BaseProvider } from '@ethersproject/providers';
import {
  Connector,
  State,
  Store,
  Wallet as BaseWallet,
} from '@web3-wallet/core';
import { ComputedRef } from 'vue';

export interface Wallet<C extends Connector = Connector> extends BaseWallet<C> {
  store: Store;
  connector: C;
  chainId: ComputedRef<State['chainId']>;
  accounts: ComputedRef<State['accounts']>;
  isActivating: ComputedRef<State['isActivating']>;
  account: ComputedRef<string | undefined>;
  isActive: ComputedRef<boolean>;
  useProvider: (
    network?: Networkish,
    enabled?: boolean,
  ) => ComputedRef<BaseProvider | undefined>;
  useEnsNames: (
    provider: ComputedRef<BaseProvider | undefined>,
  ) => ComputedRef<undefined[] | (string | null)[]>;
  useEnsName: (
    provider: ComputedRef<BaseProvider | undefined>,
  ) => ComputedRef<undefined | string | null>;
}
