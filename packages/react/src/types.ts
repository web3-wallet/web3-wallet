import type { Networkish } from '@ethersproject/networks';
import type { BaseProvider, Web3Provider } from '@ethersproject/providers';
import type { Connector, State, Store, WalletName } from '@web3-wallet/core';
import type { UseBoundStore } from 'zustand';

export * from '@web3-wallet/core';

export interface Wallet<C extends Connector = Connector> {
  name: WalletName;
  connector: C;
  store: UseBoundStore<
    Store & {
      getServerState?: () => State;
    }
  >;
  hooks: {
    useChainId: () => State['chainId'];
    useAccounts: () => State['accounts'];
    useIsActivating: () => State['isActivating'];
    useAccount: () => string | undefined;
    useIsActive: () => boolean;
    useProvider: <T extends BaseProvider = Web3Provider>(
      network?: Networkish,
      enabled?: boolean,
    ) => T | undefined;
    useENSNames: (provider?: BaseProvider) => undefined[] | (string | null)[];
    useENSName: (provider?: BaseProvider) => undefined | string | null;
  };
}
