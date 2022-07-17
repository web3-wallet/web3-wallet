import {
  type Actions,
  type Connector,
  type Wallet,
  createStore,
} from '@web3-wallet/ethereum';
import createReactStore from 'zustand';

import { getAugmentedHooks, getDerivedHooks, getStateHooks } from './hooks';

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
  const useWalletStore = createReactStore(store);

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
