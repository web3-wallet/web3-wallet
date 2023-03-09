import type { Connector, CreateCurrentWalletOptions } from '@web3-wallet/core';
import { createCurrentWallet as coreCreateCurrentWallet } from '@web3-wallet/core';
import { useEffect, useRef, useState } from 'react';

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

  const useWalletName: CurrentWallet['useWalletName'] = () =>
    currentWallet.getStore()((s) => s.walletName);

  const useConnectionStatus: CurrentWallet['useConnectionStatus'] = () =>
    currentWallet.getStore()((s) => s.connectionStatus);

  const useHasProvider: ProviderHooks['useHasProvider'] = (...args) => {
    const [hasProvider, setHasProvider] = useState(false);
    const walletName = useWalletName();
    const argsRef = useRef(args);
    argsRef.current = args;

    useEffect(() => {
      let canceled = false;

      currentWallet
        .getConnector()
        .detectProvider(...argsRef.current)
        .then(() => {
          if (!canceled) setHasProvider(true);
        })
        .catch(() => {
          if (!canceled) setHasProvider(false);
        });

      return () => {
        canceled = true;
      };
    }, [walletName]);

    return hasProvider;
  };

  return {
    ...currentWallet,
    useHasProvider,
    useWalletName,
    useConnectionStatus,
  };
};
