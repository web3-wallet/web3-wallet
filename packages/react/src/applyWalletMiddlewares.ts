import type { WalletMiddlewares } from './plugin';
import { walletMiddlewareNames } from './plugin';
import type { Wallet } from './types';

export const applyWalletMiddleWares = (
  wallet: Wallet,
  middleWares: WalletMiddlewares | undefined,
): Wallet => {
  const nextWallet: Wallet = {
    ...wallet,
  };

  if (!middleWares) return nextWallet;

  for (const name of walletMiddlewareNames) {
    const m = middleWares[name];

    if (!m) continue;

    if (typeof m !== 'function') {
      console.debug(`Middleware "${name}" must be a function, got ${typeof m}`);
      continue;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (nextWallet as any)[name] = m({ wallet })((nextWallet as any)[name]);
  }

  return nextWallet;
};
