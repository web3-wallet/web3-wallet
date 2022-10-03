import {
  type Connector,
  type WalletState,
  createWallet as createCoreWallet,
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
 * @returns Wallet - The created wallet.
 */
export const createWallet = (connector: Connector): Wallet => {
  const coreWallet = createCoreWallet(connector);

  const state = reactive<WalletState>({
    ...coreWallet.getStore().getState(),
  });

  coreWallet.getStore().subscribe((nextState) => {
    Object.assign(state, nextState);
  });

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
  const useProvider = createGetProvider({
    connector,
    chainId,
    isConnected,
  });
  const useEnsNames = getUseEnsNames(accounts);
  const useEnsName = getUseEnsName(account);

  return {
    ...coreWallet,
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
