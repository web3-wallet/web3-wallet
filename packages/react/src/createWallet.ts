import type { Connector, WalletStoreActions } from '@web3-wallet/core';
import { createWalletStoreAndActions } from '@web3-wallet/core';
import createReactStore from 'zustand';

import { getAugmentedHooks, getDerivedHooks, getStateHooks } from './hooks';
import type { Wallet } from './types';

/**
 * @typeParam C - The type of the `connector` returned from `f`.
 * @param f - A function which is called with `actions` bound to the returned `store`.
 * @returns Wallet - The created wallet api.
 */
export const createWallet = <C extends Connector>(
  f: (actions: WalletStoreActions) => C,
): Wallet<C> => {
  const { store, actions } = createWalletStoreAndActions();

  const connector = f(actions);
  const reactStore = createReactStore(store);

  const stateHooks = getStateHooks(reactStore);
  const derivedHooks = getDerivedHooks(stateHooks);
  const augmentedHooks = getAugmentedHooks<C>(
    connector,
    stateHooks,
    derivedHooks,
  );

  return {
    name: connector.name,
    connector,
    getState: () => reactStore.getState(),
    hooks: {
      ...stateHooks,
      ...derivedHooks,
      ...augmentedHooks,
    },
  };
};
