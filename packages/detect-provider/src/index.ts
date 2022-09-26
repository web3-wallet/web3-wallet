import type { EventEmitter } from 'node:events';

type Milliseconds = number;

const delay = (milliseconds: Milliseconds): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
};

const startTime = Date.now();

/**
 * Defined in EIP-1193
 *
 * See
 *  - {@link https://eips.ethereum.org/EIPS/eip-1193 | EIP-1193}
 */
export interface RequestArguments {
  readonly method: string;
  readonly params?: readonly unknown[] | object;
}

/**
 * Defined in EIP-1193
 *
 * See
 *  - {@link https://eips.ethereum.org/EIPS/eip-1193 | EIP-1193}
 */
export interface Provider extends EventEmitter {
  request<T>(args: RequestArguments): Promise<T>;
}

export type DetectProviderOptions = {
  providerName?: string;
  eventName?: string;
  detectInterval?: Milliseconds;
  timeout?: Milliseconds;
  silent?: boolean;
};
/**
 * Detect and the wallet provider from the host environment.
 *
 * @param options
 * @param options.providerName - the injected provider name, default to 'ethereum'
 * @param options.eventName - the event name that is fired when the provider is injected,
 *  default to 'ethereum#initialized'
 * @param options.detectInterval - Milliseconds, the interval to check for the provider
 *  in the host environment. Default: 50
 * @param options.silent - Whether to silence console errors. Does not affect
 *  thrown errors. Default: false
 * @param options.timeout - Milliseconds to wait for 'ethereum#initialized' to
 *  be dispatched. Default: 3000
 * @returns A Promise that resolves with the Provider if it is detected within the given timeout,
 *  otherwise undefined.
 */
export const detectProvider = <T extends Provider = Provider>(
  options: DetectProviderOptions = {},
): Promise<T | undefined> => {
  const {
    providerName: providerName = 'ethereum',
    eventName = 'ethereum#initialized',
    detectInterval = 50,
    timeout = 2000,
    silent = false,
  } = options;

  const validateInputs = () => {
    if (typeof providerName !== 'string') {
      throw new Error(
        `@web3-wallet/detect-provider: Expected option 'providerName' to be a string.`,
      );
    }
    if (typeof eventName !== 'string') {
      throw new Error(
        `@web3-wallet/detect-provider: Expected option 'eventName' to be a string.`,
      );
    }
    if (typeof detectInterval !== 'number') {
      throw new Error(
        `@web3-wallet/detect-provider: Expected option 'detectInterval' to be a number.`,
      );
    }
    if (detectInterval < 20 || detectInterval > 1000) {
      throw new Error(
        `@web3-wallet/detect-provider: Expected option 'detectInterval' to be '20 < detectInterval < 1000', got ${detectInterval}`,
      );
    }
    if (typeof silent !== 'boolean') {
      throw new Error(
        `@web3-wallet/detect-provider: Expected option 'silent' to be a boolean.`,
      );
    }
    if (typeof timeout !== 'number') {
      throw new Error(
        `@web3-wallet/detect-provider: Expected option 'timeout' to be a number.`,
      );
    }
  };

  validateInputs();

  function checkForProvider(): T | undefined {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const provider: T | undefined = (window as any)[providerName];

    return typeof provider?.request === 'function' ? provider : undefined;
  }

  let handled = false;

  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(undefined);
      return;
    }

    if (checkForProvider()) {
      resolve(checkForProvider());
      return;
    }

    if (Date.now() - startTime > timeout) resolve(undefined);

    const handleEthereum = () => {
      if (handled) return;

      handled = true;

      window.removeEventListener(eventName, handleEthereum);
      const provider = checkForProvider();

      if (provider) {
        resolve(provider);
        return;
      }

      const message = `Unable to detect window.${providerName}.`;

      !silent && console.error('@web3-wallet/detect-provider:', message);
      resolve(undefined);
    };

    window.addEventListener(eventName, handleEthereum, {
      once: true,
    });

    const timer = setTimeout(() => {
      handleEthereum();
    }, timeout);

    const detectRecursively = async () => {
      if (handled) return;

      if (Date.now() - startTime > timeout) {
        resolve(undefined);
        return;
      }

      await delay(detectInterval);

      const provider = checkForProvider();

      if (provider) {
        clearTimeout(timer);
        resolve(provider);
        return;
      }

      detectRecursively();
    };

    detectRecursively();
  });
};
