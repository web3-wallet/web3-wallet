import {
  type AbstractConnector,
  type WalletStoreActions,
  createWalletStoreAndActions,
} from '@web3-wallet/core';
import createReactStore from 'zustand';

import { getAugmentedHooks, getDerivedHooks, getStateHooks } from './hooks';
import type { Wallet } from './types';

/**
 * @typeParam T - The type of the `connector` returned from `f`.
 * @param f - A function which is called with `actions` bound to the returned `store`.
 * @returns WalletApi - The created wallet.
 */
export const createWallet = <Connector extends AbstractConnector>(
  f: (actions: WalletStoreActions) => Connector,
): Wallet<Connector> => {
  const { store, actions } = createWalletStoreAndActions();

  const connector = f(actions);
  const reactStore = createReactStore(store);

  const stateHooks = getStateHooks(reactStore);
  const derivedHooks = getDerivedHooks(stateHooks);
  const augmentedHooks = getAugmentedHooks<Connector>(
    connector,
    stateHooks,
    derivedHooks,
  );

  return {
    name: connector.name,
    connector,
    store: reactStore,
    hooks: {
      ...stateHooks,
      ...derivedHooks,
      ...augmentedHooks,
    },
  };
};
