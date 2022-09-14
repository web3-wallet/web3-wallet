import type { MiddlewareContext, Middlewares, Wallet } from './types';
import { middlewareNames } from './types';

/**
 * Apply middleWares to wallet
 *
 * @param middleWares
 * @param wallet
 * @returns Wallet - A new wallet enhanced with the middleWares,
 *  the interface of the new wallet is the same as the input as wallet.
 */
export const applyMiddleWares = (
  middleWares: Middlewares | undefined,
  wallet: Wallet,
): Wallet => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nextWallet: any = {
    ...wallet,
  };

  if (!middleWares) return nextWallet;

  const middlewareContext: MiddlewareContext = {};

  for (const name of middlewareNames) {
    const middleware = middleWares[name];

    if (!middleware) continue;

    if (typeof middleware !== 'function') {
      console.debug(
        `Middleware "${name}" must be a function, got ${typeof middleware}`,
      );
      continue;
    }

    nextWallet[name] = middleware(middlewareContext)(nextWallet[name]);
  }

  return nextWallet as Wallet;
};
