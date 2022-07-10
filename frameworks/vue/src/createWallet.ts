import { createStore } from '@vvswallet/store';
import type { Actions, Connector, State, Store } from '@vvswallet/types';
import { reactive } from 'vue';

import {
  type DerivedHooks,
  type StateHooks,
  getDerivedHooks,
  getStateHooks,
} from './hooks';

type Hooks = StateHooks & DerivedHooks;

export type WalletApi<T extends Connector = Connector> = {
  connector: T;
  hooks: Hooks;
  store: Store;
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

  const state = reactive<State>({
    ...store.getState(),
  });

  store.subscribe((nextState) => {
    Object.assign(state, nextState);
  });

  const connector = f(actions);

  const stateHooks = getStateHooks(state);
  const derivedHooks = getDerivedHooks(stateHooks);

  return {
    connector,
    store,
    hooks: { ...stateHooks, ...derivedHooks },
  };
};
