import type {
  BaseProvider,
  Networkish,
  Web3Provider,
} from '@ethersproject/providers';
import type { AbstractConnector } from '@web3-wallet/core';
import { type Ref, computed, ref, watchEffect } from 'vue';

import type { Wallet } from './types';

/**
 * Only try to import @ethersproject/providers once
 *
 * flag for tracking wether we have already imported @ethersproject/providers once
 */
let flag = false;

const dynamicProvider: Ref<typeof Web3Provider | undefined> = ref(undefined);

async function importProvider(): Promise<typeof dynamicProvider> {
  if (flag) return dynamicProvider;

  flag = true;

  try {
    const { Web3Provider } = await import('@ethersproject/providers');
    dynamicProvider.value = Web3Provider;
  } catch {
    console.debug('@ethersproject/providers not available');
  }

  return dynamicProvider;
}

export const createGetProvider = <T extends AbstractConnector>({
  connector,
  isConnected,
  chainId,
}: {
  connector: T;
  isConnected: Wallet['isConnected'];
  chainId: Wallet['chainId'];
}): Wallet['useProvider'] => {
  const useProvider = <T extends BaseProvider = Web3Provider>(
    network?: Networkish,
  ) => {
    watchEffect(() => {
      if (dynamicProvider.value === undefined) {
        importProvider();
      }
    });

    return computed(() => {
      // to ensure connectors remain fresh, we condition re-renders on loaded, isConnected and chainId
      void isConnected.value && chainId.value;
      if (dynamicProvider.value && connector.provider) {
        return new dynamicProvider.value(
          connector.provider,
          network,
        ) as unknown as T;
      }
    });
  };

  return useProvider;
};
