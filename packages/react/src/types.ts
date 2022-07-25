import type { Networkish } from '@ethersproject/networks';
import type { BaseProvider } from '@ethersproject/providers';
import {
  type Connector,
  State,
  Store,
  Wallet as EthereumWallet,
} from '@web3-wallet/ethereum';
import type { UseBoundStore } from 'zustand';

export interface Wallet<C extends Connector = Connector>
  extends EthereumWallet<C> {
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
