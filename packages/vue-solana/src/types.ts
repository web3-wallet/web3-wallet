import {
  Connector,
  State,
  Store,
  Wallet as SolanaWallet,
} from '@web3-wallet/solana';
import { ComputedRef } from 'vue';

export interface Wallet<C extends Connector = Connector>
  extends SolanaWallet<C> {
  store: Store;
  connector: C;
  isActivating: ComputedRef<State['isActivating']>;
  account: ComputedRef<string | undefined>;
  isActive: ComputedRef<boolean>;
}
