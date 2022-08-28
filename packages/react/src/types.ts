import type { Networkish } from '@ethersproject/networks';
import type { BaseProvider } from '@ethersproject/providers';
import {
  type Connector,
  State,
  Store,
  Wallet as BaseWallet,
} from '@web3-wallet/core';
import type { UseBoundStore } from 'zustand';

export interface Wallet<C extends Connector = Connector> extends BaseWallet<C> {
  connector: C;
  store: UseBoundStore<
    Store & {
      getServerState?: () => State;
    }
  >;
  useChainId: () => State['chainId'];
  useAccounts: () => State['accounts'];
  useIsActivating: () => State['isActivating'];
  useAccount: () => string | undefined;
  useIsActive: () => boolean;
  useProvider: (
    network?: Networkish,
    enabled?: boolean,
  ) => BaseProvider | undefined;
  useENSNames: (provider?: BaseProvider) => undefined[] | (string | null)[];
  useENSName: (provider?: BaseProvider) => undefined | string | null;
}
