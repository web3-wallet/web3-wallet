import { createStore } from '@vvswallet/store';
import type { Actions, Connector, Store } from '@vvswallet/types';
import create from 'zustand';

import {
  type AugmentedHooks,
  type DerivedHooks,
  type StateHooks,
  getAugmentedHooks,
  getDerivedHooks,
  getStateHooks,
} from './hooks';

type Hooks = StateHooks & DerivedHooks & AugmentedHooks;

export type WalletApi<T extends Connector = Connector> = {
  connector: T;
  store: Store;
  hooks: Hooks;
};

/**
 * @typeParam T - The type of the `connector` returned from `f`.
 * @param f - A function which is called with `actions` bound to the returned `store`.
 * @returns WalletApi - The created wallet.
 */
export const createWallet = <T extends Connector>(
  f: (actions: Actions) => T,
): WalletApi<T> => {
  const { store, actions } = createStore();

  const connector = f(actions);
  const useWalletStore = create(store);

  const stateHooks = getStateHooks(useWalletStore);
  const derivedHooks = getDerivedHooks(stateHooks);
  const augmentedHooks = getAugmentedHooks<T>(
    connector,
    stateHooks,
    derivedHooks,
  );

  return {
    connector,
    store,
    hooks: { ...stateHooks, ...derivedHooks, ...augmentedHooks },
  };
};
