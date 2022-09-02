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

export const createGetProvider = <T extends Connector>({
  connector,
  isActive,
  chainId,
}: {
  connector: T;
  isActive: Wallet['isActive'];
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
      // to ensure connectors remain fresh, we condition re-renders on loaded, isActive and chainId
      void isActive.value && chainId.value;
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
