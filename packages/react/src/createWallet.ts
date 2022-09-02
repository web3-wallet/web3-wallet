import createReactStore from 'zustand';

import { getAugmentedHooks, getDerivedHooks, getStateHooks } from './hooks';
import {
  type Actions,
  type Connector,
  type Wallet,
  createStore,
} from './types';

/**
 * @typeParam T - The type of the `connector` returned from `f`.
 * @param f - A function which is called with `actions` bound to the returned `store`.
 * @returns WalletApi - The created wallet.
 */
export const createWallet = <C extends Connector>(
  f: (actions: Actions) => C,
): Wallet<C> => {
  const { store, actions } = createStore();

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
    store: reactStore,
    hooks: {
      ...stateHooks,
      ...derivedHooks,
      ...augmentedHooks,
    },
  };
};
