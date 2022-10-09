import { createWallet as createCoreWallet } from '@web3-wallet/core';

import { createReactWallet } from './createReactWallet';
import type { Wallet } from './types';

export { CreateWalletOptions } from '@web3-wallet/core';

export const createWallet = (
  ...args: Parameters<typeof createCoreWallet>
): Wallet => {
  const coreWallet = createCoreWallet(...args);
  return createReactWallet(coreWallet);
};
