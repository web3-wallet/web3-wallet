import type { Actions, Connector, State } from '@web3-wallet/ethereum';
import { createStore } from '@web3-wallet/ethereum';
import { computed, reactive } from 'vue';

import { getUseEnsName, getUseEnsNames } from './ensNames';
import { createGetProvider } from './provider';
import type { Wallet } from './types';

const computeIsActive = ({
  chainId,
  accounts,
  isActivating,
}: State): boolean => {
  return Boolean(chainId && accounts && accounts.length && !isActivating);
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

  const chainId = computed(() => state.chainId);
  const accounts = computed(() => state.accounts);
  const isActivating = computed(() => state.isActivating);
  const account = computed(() => state.accounts?.[0]);
  const isActive = computed(() =>
    computeIsActive({
      chainId: chainId.value,
      accounts: accounts.value,
      isActivating: isActivating.value,
    }),
  );
  const useProvider = createGetProvider<C>({
    connector,
    chainId,
    isActive,
  });
  const useEnsNames = getUseEnsNames(accounts);
  const useEnsName = getUseEnsName(account);

  return {
    connector,
    store,
    chainId,
    accounts,
    isActivating,
    account,
    isActive,
    useProvider,
    useEnsName,
    useEnsNames,
  };
};
