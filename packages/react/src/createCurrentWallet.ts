import type { Connector, CreateCurrentWalletOptions } from '@web3-wallet/core';
import { createCurrentWallet as coreCreateCurrentWallet } from '@web3-wallet/core';

import { createReactWallet } from './createReactWallet';
import { useMutation } from './query';
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
