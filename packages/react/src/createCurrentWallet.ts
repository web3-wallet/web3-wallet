import { createCurrentWallet as coreCreateCurrentWallet } from '@web3-wallet/core';

import { createReactWallet } from './createReactWallet';
import { useMutation } from './query';
import type { CurrentWallet } from './types';

export const createCurrentWallet = (
  ...args: Parameters<typeof coreCreateCurrentWallet>
): CurrentWallet => {
  const coreCurrentWallet = coreCreateCurrentWallet(...args);
  const currentReactWallet = createReactWallet(
    coreCurrentWallet,
  ) as unknown as CurrentWallet;

  const useName: CurrentWallet['useName'] = () =>
    currentReactWallet.getReactStore()((s) => s.name);

  const useConnectionStatus: CurrentWallet['useConnectionStatus'] = () =>
    currentReactWallet.getReactStore()((s) => s.connectionStatus);

  return {
    ...currentReactWallet,
    useName,
    useConnectionStatus,
    useConnectAsCurrentWallet: (options) =>
      useMutation(
        (variables) =>
          currentReactWallet.connectAsCurrentWallet(
            variables.walletName,
            variables.chain,
          ),
        options,
      ),
  };
};
