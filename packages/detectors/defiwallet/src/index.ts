interface EthereumProvider {
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

export interface DeFiWalletChromeExtensionEthereumProviderOptions {
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
export interface DeFiWalletChromeExtensionEthereumProvider
  extends EthereumProvider {
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
  connect: (
    options: DeFiWalletChromeExtensionEthereumProviderOptions,
  ) => Promise<void>;
}
/**
 * only need to config this for
 */

export type DefiWalletMobileEthereumProviderOptions = unknown;
export interface DefiWalletMobileEthereumProvider extends EthereumProvider {
  isTrust?: boolean;
}

declare global {
  interface Window {
    deficonnectProvider?: DeFiWalletChromeExtensionEthereumProvider;
    ethereum?: DefiWalletMobileEthereumProvider;
  }
}

const delay = (wait: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, wait);
  });
};

export type DeFiWalletEthereumProviderMap =
  | {
      defiWalletChromeExtensionEthereumProvider: DeFiWalletChromeExtensionEthereumProvider;
      defiWalletMobileAppEthereumProvider?: never;
    }
  | {
      defiWalletChromeExtensionEthereumProvider?: never;
      defiWalletMobileAppEthereumProvider: DefiWalletMobileEthereumProvider;
    };
/**
 * crypto.com DeFi wallet takes about 1 seconds to inject it's provider to window.
 *
 * @param retries the max retry times
 * @param interval the retry interval
 * @returns the crypto.com DeFi wallet browser extension provider or undefined
 */
const detectDeFiWalletProvider = async (
  retries = 40,
  interval = 50,
): Promise<DeFiWalletEthereumProviderMap | undefined> => {
  const providerMap = getProvider();

  if (providerMap || retries === 0) return providerMap;

  await delay(interval);

  return await detectDeFiWalletProvider(retries - 1, interval);
};

const getProvider = (): DeFiWalletEthereumProviderMap | undefined => {
  if (typeof window === 'undefined') return undefined;
  /**
   * `window.deficonnectProvider` is injected by crypto.com DeFi Wallet chrome extension.
   */
  if (window.deficonnectProvider) {
    return {
      defiWalletChromeExtensionEthereumProvider:
        window.deficonnectProvider as DeFiWalletChromeExtensionEthereumProvider,
    };
  }

  /**
   * In crypto.com DeFi wallet mobile app dApp-browser/builtin-browser:
   *  1. It added the 'DeFiWallet' to userAgent the dApp-browser/builtin-browser.
   *  2. It injected the window.ethereum to window.
   */
  if (window.navigator?.userAgent?.includes('DeFiWallet') && window.ethereum) {
    return {
      defiWalletMobileAppEthereumProvider:
        window.ethereum as DefiWalletMobileEthereumProvider,
    };
  }

  return undefined;
};

const detectProvider = async (): Promise<
  DeFiWalletEthereumProviderMap | undefined
> => {
  const provider = await detectDeFiWalletProvider();

  return provider;
};

export const detectDeFiWalletChromeExtensionEthereumProvider =
  async (): Promise<DeFiWalletChromeExtensionEthereumProvider | undefined> => {
    const provider = await detectDeFiWalletProvider();

    return provider?.defiWalletChromeExtensionEthereumProvider;
  };

export const detectDeFiWalletMobileEthereumProvider = async (): Promise<
  DefiWalletMobileEthereumProvider | undefined
> => {
  const provider = await detectDeFiWalletProvider();

  return provider?.defiWalletMobileAppEthereumProvider;
};

export default detectProvider;
