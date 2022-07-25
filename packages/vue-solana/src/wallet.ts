import type { Actions, Connector, State } from '@web3-wallet/solana';
import { createStore } from '@web3-wallet/solana';
import { computed, reactive } from 'vue';

import type { Wallet } from './types';

const computeIsActive = ({ account, isActivating }: State): boolean => {
  return Boolean(account && !isActivating);
};

/**
 * @typeParam T - The type of the `connector` returned from `f`.
 * @param f - A function which is called with `actions` bound to the returned `store`.
 * @returns WalletApi - The created wallet.
 */
export const createWallet = <C extends Connector = Connector>(
  f: (actions: Actions) => C,
): Wallet<C> => {
  const { store, actions } = createStore();

  const state = reactive<State>({
    ...store.getState(),
  });

  store.subscribe((nextState) => {
    Object.assign(state, nextState);
  });

  const connector = f(actions);

  const account = computed(() => state.account);
  const isActivating = computed(() => state.isActivating);
  const isActive = computed(() =>
    computeIsActive({
      account: account.value,
      isActivating: isActivating.value,
    }),
  );

  return {
    connector,
    store,
    isActivating,
    account,
    isActive,
  };
};
