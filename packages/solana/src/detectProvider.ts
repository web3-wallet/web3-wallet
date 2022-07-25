import { Provider } from './types';

const delay = (wait: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, wait);
  });
};

export interface SolanaWindow<P extends Provider> extends Window {
  solana?: P;
}

/**
 * @param retries the max retry times
 * @param interval the retry interval
 */
export const detectProvider = async <P extends Provider>(
  detect?: () => P | undefined,
  retries = 40,
  interval = 50,
): Promise<P | undefined> => {
  if (typeof window === 'undefined') return undefined;

  let provider: P | undefined;

  if (!detect) {
    provider = (window as SolanaWindow<P>).solana;
  } else {
    provider = detect();
  }

  if (provider || retries === 0) return provider;

  await delay(interval);

  return await detectProvider(detect, retries - 1, interval);
};
