interface Provider {
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

export interface DeFiWalletProviderOptions {
  chainType: 'eth';
  appName: string;
  chainId: number;
  rpcUrls: Record<ChainId, string>;
  customNode?: {
    name: string;
    rpcUrl: string;
    symbol: string;
    decimal: string;
    explorer?: string;
  };
}
type ChainId = number;
type ChainIdHex = string;
export interface DeFiWalletProvider extends Provider {
  /**
   * DeFi Wallet chrome extension
   */
  isDeficonnectProvider: boolean;
  /**
   * DeFi Wallet mobile app
   *
   * crypto.com DeFi Wallet mobile app uses trust wallet's provider, and it is injected to
   * the dApp/builtin-browser.
   */
  chainId?: ChainIdHex;
  accounts?: string[];
  close: () => Promise<void>;
  connect: (options: DeFiWalletProviderOptions) => Promise<void>;
}

interface DeFiWalletWindow extends Window {
  deficonnectProvider?: DeFiWalletProvider;
}
declare const window: DeFiWalletWindow;

const delay = (wait: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, wait);
  });
};

/**
 * crypto.com DeFi wallet takes about 1 seconds to inject it's provider to window.
 *
 * @param retries the max retry times
 * @param interval the retry interval
 * @returns the crypto.com DeFi wallet browser extension provider or undefined
 */
export const detectProvider = async (
  retries = 40,
  interval = 50,
): Promise<DeFiWalletProvider | undefined> => {
  const providerMap = useProvider();

  if (providerMap || retries === 0) return providerMap;

  await delay(interval);

  return await detectProvider(retries - 1, interval);
};

const useProvider = (): DeFiWalletProvider | undefined => {
  if (typeof window === 'undefined') return undefined;
  /**
   * `window.deficonnectProvider` is injected by crypto.com DeFi Wallet chrome extension.
   */
  if (window.deficonnectProvider) {
    return window.deficonnectProvider;
  }

  return undefined;
};
