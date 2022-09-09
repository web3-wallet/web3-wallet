import {
  type Connector,
  type WalletState,
  type WalletStoreActions,
  createWalletStoreAndActions,
} from '@web3-wallet/core';
import { computed, reactive } from 'vue';

import { getUseEnsName, getUseEnsNames } from './ensNames';
import { createGetProvider } from './provider';
import { type Wallet } from './types';

const computeIsConnected = ({
  chainId,
  accounts,
  isConnecting,
}: Pick<WalletState, 'chainId' | 'accounts' | 'isConnecting'>): boolean => {
  return Boolean(chainId && accounts && accounts.length && !isConnecting);
};

/**
 * @typeParam C - The type of the `connector` returned from `f`.
 * @param f - A function which is called with `actions` bound to the returned `store`.
 * @returns WalletApi - The created wallet.
 */
export const createWallet = <C extends Connector>(
  f: (actions: WalletStoreActions) => C,
): Wallet<C> => {
  const { store, actions } = createWalletStoreAndActions();

  const state = reactive<WalletState>({
    ...store.getState(),
  });

  store.subscribe((nextState) => {
    Object.assign(state, nextState);
  });

  const connector = f(actions);

  const chainId = computed(() => state.chainId);
  const accounts = computed(() => state.accounts);
  const isConnecting = computed(() => state.isConnecting);
  const account = computed(() => state.accounts?.[0]);
  const isConnected = computed(() =>
    computeIsConnected({
      chainId: chainId.value,
      accounts: accounts.value,
      isConnecting: isConnecting.value,
    }),
  );
  const useProvider = createGetProvider<C>({
    connector,
    chainId,
    isConnected,
  });
  const useEnsNames = getUseEnsNames(accounts);
  const useEnsName = getUseEnsName(account);

  return {
    name: connector.name,
    connector,
    /**
     * [Notice], the state return from getState reactive
     *
     * @returns WalletState
     */
    getState: () => store.getState(),
    chainId,
    accounts,
    isConnecting,
    account,
    isConnected,
    useProvider,
    useEnsName,
    useEnsNames,
  };
};
