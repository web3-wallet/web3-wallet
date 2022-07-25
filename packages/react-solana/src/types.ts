import {
  type Connector,
  State,
  Store,
  Wallet as SolanaWallet,
} from '@web3-wallet/solana';
import type { UseBoundStore } from 'zustand';

export interface Wallet<C extends Connector = Connector>
  extends SolanaWallet<C> {
  connector: C;
  store: UseBoundStore<
    Store & {
      getServerState?: () => State;
    }
  >;
  useIsActivating: () => State['isActivating'];
  useAccount: () => string | undefined;
  useIsActive: () => boolean;
}
