import type {
  BaseProvider,
  Networkish,
  Web3Provider,
} from '@ethersproject/providers';
import type { Connector } from '@web3-wallet/core';
import { type Ref, computed, ref, watchEffect } from 'vue';

import type { Wallet } from './types';

/**
 * Only try to import @ethersproject/providers once
 *
 * Tracking wether we have already tried to imported @ethersproject/providers
 */
let tried = false;

const dynamicProvider: Ref<typeof Web3Provider | undefined> = ref(undefined);

/**
 * Dynamic import the Web3Provider
 *
 * @returns it
 *  1. resolve with the imported Web3Provider,
 *  2. or reject with undefined, if failed to imported the Web3Provider
 */
async function importProvider(): Promise<typeof dynamicProvider> {
  if (tried) return dynamicProvider;

  tried = true;

  try {
    const { Web3Provider } = await import('@ethersproject/providers');
    dynamicProvider.value = Web3Provider;
  } catch {
    console.debug('@ethersproject/providers not available');
  }

  return dynamicProvider;
}

export const createGetProvider = ({
  connector,
  isConnected,
  chainId,
}: {
  connector: Connector;
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

      return undefined;
    });
  };

  return useProvider;
};
