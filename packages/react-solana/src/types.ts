import { type Connector, State, Store } from '@web3-wallet/solana';
import type { UseBoundStore } from 'zustand';

export type Wallet<T extends Connector = Connector> = {
  connector: T;
  store: UseBoundStore<
    Store & {
      getServerState?: () => State;
    }
  >;
  useIsActivating: () => State['isActivating'];
  useAccount: () => string | undefined;
  useIsActive: () => boolean;
};
