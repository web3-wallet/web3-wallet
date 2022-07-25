import { computed, ComputedRef, ref, watchEffect } from 'vue';

import { Wallet } from './types';

/**
 * @returns ENSNames - An array of length `accounts.length` which contains entries which are either all `undefined`,
 * indicated that names cannot be fetched because there's no provider, or they're in the process of being fetched,
 * or `string | null`, depending on whether an ENS name has been set for the account in question or not.
 */
function useEns(
  provider: ReturnType<Wallet['useProvider']>,
  accounts: Wallet['accounts'],
): ComputedRef<undefined[] | (string | null)[]> {
  const ensNames = ref<(string | null)[] | undefined>(undefined);

  watchEffect((cleanup) => {
    if (provider.value && accounts.value?.length) {
      let stale = false;

      Promise.all(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        accounts.value.map((account) => provider.value!.lookupAddress(account)),
      )
        .then((values) => {
          if (stale) return;
          ensNames.value = values;
        })
        .catch((error) => {
          if (stale) return;
          console.debug('Could not fetch ENS names', error);
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          ensNames.value = new Array<null>(accounts.value!.length).fill(null);
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
      account.value === undefined ? undefined : [account.value],
    );
    return computed(() => useEns(provider, accounts).value?.[0]);
  };
