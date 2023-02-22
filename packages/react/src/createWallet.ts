import type { Wallet as CoreWallet } from '@web3-wallet/core';

import {
  createBalanceHooks,
  createCoreHooks,
  createEnsHooks,
  createProviderHooks,
} from './hooks';
import type { Wallet } from './types';

export const createWallet = (coreWallet: CoreWallet): Wallet => {
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
