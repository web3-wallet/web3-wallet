import { type ComputedRef, computed, ref, watchEffect } from 'vue';

import type { Wallet } from './types';

function useEns(
  provider: ReturnType<Wallet['useProvider']>,
  accounts: Wallet['accounts'],
): ComputedRef<(string | undefined)[]> {
  const ensNames = ref<(string | undefined)[] | undefined>(undefined);

  watchEffect((cleanup) => {
    if (provider.value && accounts.value?.length) {
      let stale = false;

      Promise.all(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        accounts.value.map((account) => provider.value!.lookupAddress(account)),
      )
        .then((values) => {
          if (stale) return;
          ensNames.value = values.map((v) => (v ? v : undefined));
        })
        .catch((error) => {
          if (stale) return;
          console.debug('Could not fetch ENS names', error);
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          ensNames.value = new Array<undefined>(accounts.value!.length).fill(
            undefined,
          );
        });

      cleanup(() => {
        stale = true;
      });
    }
  });

  return computed(() => {
    if (ensNames.value) return ensNames.value;
    return new Array<undefined>(accounts.value?.length ?? 0).fill(undefined);
  });
}

export const getUseEnsNames =
  (accounts: Wallet['accounts']): Wallet['useEnsNames'] =>
  (provider) =>
    useEns(provider, accounts);

export const getUseEnsName =
  (account: Wallet['account']): Wallet['useEnsName'] =>
  (provider) => {
    const accounts = computed(() =>
      account.value === undefined ? [] : [account.value],
    );
    return computed(() => useEns(provider, accounts).value?.[0]);
  };
