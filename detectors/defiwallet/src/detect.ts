interface DeFiWalletEthereumProvider {
  isDeficonnectProvider: boolean;
  isMetaMask?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  once(eventName: string | symbol, listener: (...args: any[]) => void): this;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  on(eventName: string | symbol, listener: (...args: any[]) => void): this;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  off(eventName: string | symbol, listener: (...args: any[]) => void): this;
  addListener(
    eventName: string | symbol,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    listener: (...args: any[]) => void,
  ): this;
  removeListener(
    eventName: string | symbol,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    listener: (...args: any[]) => void,
  ): this;
  removeAllListeners(event?: string | symbol): this;
}

declare global {
  interface Window {
    deficonnectProvider?: DeFiWalletEthereumProvider;
  }
}

export const detectDeFiWalletProvider = async (): Promise<
  DeFiWalletEthereumProvider | undefined
> => {
  const provider = await detectDeFiWalletProviderWithRetry();

  return provider;
};

const delay = (wait: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, wait);
  });
};

/**
 *
 * crypto.com DeFi wallet browser extension take some about 1 seconds to inject it's provider to
 * window.
 * @param retries the max retry times
 * @param interval the retry interval
 * @returns the crypto.com DeFi wallet browser extension provider or undefined
 */
const detectDeFiWalletProviderWithRetry = async (
  retries = 40,
  interval = 50,
): Promise<DeFiWalletEthereumProvider | undefined> => {
  const provider = getDeFiWalletProvider();

  if (provider || retries === 0) return provider;

  await delay(interval);

  return await detectDeFiWalletProviderWithRetry(retries - 1, interval);
};

const getDeFiWalletProvider = (): DeFiWalletEthereumProvider | undefined => {
  if (window.deficonnectProvider) {
    return window.deficonnectProvider as DeFiWalletEthereumProvider;
  }

  return undefined;
};
