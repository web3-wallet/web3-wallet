import type {
  BaseProvider,
  Networkish,
  Web3Provider,
} from '@ethersproject/providers';
import type { Connector } from '@web3-wallet/core';
import { type Ref, computed, ref, watchEffect } from 'vue';

import type { Wallet } from './types';

const dynamicProvider: Ref<typeof Web3Provider | null | undefined> =
  ref(undefined);

async function importProvider(): Promise<void> {
  if (dynamicProvider.value === undefined) {
    try {
      const { Web3Provider } = await import('@ethersproject/providers');
      dynamicProvider.value = Web3Provider;
    } catch {
      console.debug('@ethersproject/providers not available');
      dynamicProvider.value = null;
    }
  }
}

/**
 * Avoid type erasure by returning the most qualified type if not otherwise set.
 * Note that this function's return type is `T | undefined`, but there is a code path
 * that returns a Web3Provider, which could conflict with a user-provided T. So,
 * it's important that users only provide an override for T if they know that
 * `connector.customProvider` is going to be defined and of type T.
 *
 * @typeParam T - A type argument must only be provided if using `connector.customProvider`, in which case it
 * must match the type of this property.
 */

export const createGetProvider = <T extends Connector>({
  connector,
  isActive,
  chainId,
}: {
  connector: T;
  isActive: Wallet['isActive'];
  chainId: Wallet['chainId'];
}): Wallet['useProvider'] => {
  return (network?: Networkish, enabled = true) => {
    watchEffect(() => {
      if (dynamicProvider.value === undefined) {
        importProvider();
      }
    });

    return computed(() => {
      // to ensure connectors remain fresh, we condition re-renders on loaded, isActive and chainId
      void isActive.value && chainId.value;
      if (enabled && dynamicProvider.value && connector.provider) {
        return new dynamicProvider.value(
          connector.provider,
          network,
        ) as unknown as BaseProvider;
      }
    });
  };
};
