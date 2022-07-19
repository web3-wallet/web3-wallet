import type { Networkish } from '@ethersproject/networks';
import type { BaseProvider } from '@ethersproject/providers';
import { type Connector, State, Store } from '@web3-wallet/ethereum';
import type { UseBoundStore } from 'zustand';

export type Wallet<T extends Connector = Connector> = {
  connector: T;
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
};
