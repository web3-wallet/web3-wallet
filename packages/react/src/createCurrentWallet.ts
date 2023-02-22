import type { Connector, CreateCurrentWalletOptions } from '@web3-wallet/core';
import { createCurrentWallet as coreCreateCurrentWallet } from '@web3-wallet/core';
import { useEffect, useState } from 'react';

import { createWallet } from './createWallet';
import type { ProviderHooks } from './hooks';
import type { CurrentWallet, Wallet } from './types';

export { CreateCurrentWalletOptions } from '@web3-wallet/core';

export const createCurrentWallet = (
  connectorsOrWallets: (Connector | Wallet)[],
  options?: CreateCurrentWalletOptions,
): CurrentWallet => {
  const coreCurrentWallet = coreCreateCurrentWallet(
    connectorsOrWallets,
    options,
  );

  const { useHasProvider: _, ...currentWallet } = createWallet(
    coreCurrentWallet,
  ) as unknown as CurrentWallet;

  const useName: CurrentWallet['useName'] = () =>
    currentWallet.getStore()((s) => s.name);

  const useConnectionStatus: CurrentWallet['useConnectionStatus'] = () =>
    currentWallet.getStore()((s) => s.connectionStatus);

  const useHasProvider: ProviderHooks['useHasProvider'] = (...args) => {
    const [hasProvider, setHasProvider] = useState(false);
    const name = useName();

    useEffect(() => {
      let canceled = false;

      currentWallet
        .getConnector()
        .detectProvider(...args)
        .then(() => {
          if (!canceled) setHasProvider(true);
        })
        .catch(() => {
          if (!canceled) setHasProvider(false);
        });

      return () => {
        canceled = true;
      };
      // don't track the args updates
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name]);

    return hasProvider;
  };

  return {
    ...currentWallet,
    useHasProvider,
    useName,
    useConnectionStatus,
  };
};
