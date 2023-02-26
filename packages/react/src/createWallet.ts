import type { Connector, Wallet as CoreWallet } from '@web3-wallet/core';
import { createWallet as createCoreWallet, isWallet } from '@web3-wallet/core';

import {
  createBalanceHooks,
  createCoreHooks,
  createEnsHooks,
  createProviderHooks,
} from './hooks';
import type { Wallet } from './types';

export const createWallet = (
  walletOrConnector: CoreWallet | Connector,
): Wallet => {
  const coreWallet = isWallet(walletOrConnector)
    ? walletOrConnector
    : createCoreWallet(walletOrConnector);

  let wallet = coreWallet as unknown as Wallet;

  wallet = [
    createCoreHooks,
    createProviderHooks,
    createBalanceHooks,
    createEnsHooks,
  ].reduce<Wallet>(
    (w, createHooks) => ({
      ...w,
      ...createHooks(w),
    }),
    wallet,
  );

  return wallet;
};
