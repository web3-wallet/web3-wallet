import type { Actions, Connector, State, Wallet } from '@web3-wallet/ethereum';
import { createStore } from '@web3-wallet/ethereum';
import { reactive } from 'vue';

import { getDerivedHooks, getStateHooks } from './hooks';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MockHook = (...args: any[]) => any;
const mockHook: MockHook = () => {};

/**
 * @typeParam T - The type of the `connector` returned from `f`.
 * @param f - A function which is called with `actions` bound to the returned `store`.
 * @returns WalletApi - The created wallet.
 */
export const createWallet = <T extends Connector = Connector>(
  f: (actions: Actions) => T,
): Wallet<T> => {
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
    hooks: {
      ...stateHooks,
      ...derivedHooks,
      useENSName: mockHook,
      useENSNames: mockHook,
      useProvider: mockHook,
    },
  };
};
