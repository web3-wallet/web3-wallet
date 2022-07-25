import { type Actions, type Connector, createStore } from '@web3-wallet/solana';
import createReactStore from 'zustand';

import { getDerivedHooks, getStateHooks } from './hooks';
import type { Wallet } from './types';

/**
 * @typeParam T - The type of the `connector` returned from `f`.
 * @param f - A function which is called with `actions` bound to the returned `store`.
 * @returns WalletApi - The created wallet.
 */
export const createWallet = <T extends Connector>(
  f: (actions: Actions) => T,
): Wallet<T> => {
  const { store, actions } = createStore();

  const connector = f(actions);
  const reactStore = createReactStore(store);

  const stateHooks = getStateHooks(reactStore);
  const derivedHooks = getDerivedHooks(stateHooks);
  return {
    connector,
    store: reactStore,
    ...stateHooks,
    ...derivedHooks,
  };
};
