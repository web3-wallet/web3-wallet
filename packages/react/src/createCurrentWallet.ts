import type { Connector, CreateCurrentWalletOptions } from '@web3-wallet/core';
import { createCurrentWallet as coreCreateCurrentWallet } from '@web3-wallet/core';

import { createWallet } from './createWallet';
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

  const currentWallet = createWallet(
    coreCurrentWallet,
  ) as unknown as CurrentWallet;

  const useName: CurrentWallet['useName'] = () =>
    currentWallet.getStore()((s) => s.name);

  const useConnectionStatus: CurrentWallet['useConnectionStatus'] = () =>
    currentWallet.getStore()((s) => s.connectionStatus);

  return {
    ...currentWallet,
    useName,
    useConnectionStatus,
  };
};
