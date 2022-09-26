# @web3-wallet/detect-provider

## Install

```base
pnpm add @web3-wallet/detect-provider
```

## Usage

```typescript
import { detectProvider } from '@web3-wallet/detect-provider';

const provider = await detectProvider(options);

if (provider) {
  console.log('provider successfully detected!');

  const chainId = await provider.request({
    method: 'eth_chainId',
  });
} else {
  // if the provider is not detected, detectEthereumProvider resolves to null
  console.error('Failed to detect provider', error);
}
```

## API

### types

```typescript
export interface DetectProviderOptions {
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
  options: DetectProviderOptions = {}
): Promise<T | undefined> {
  // ...
};
```

## Context

Wallet providers are usually injected to the host environment(the web browser window object) wallets(wallet browser extensions or wallet mobile APPs). In order to connect to wallets, dApps need to retrieve the wallet providers from the host environment. This library is here to help detect and retrieve the wallet providers from the host environment. @web3-wallet/detect-provider is designed to be able to detect all kinds of wallet providers from the host environment.

## Synchronous and Asynchronous Injection

Providers could be injected synchronously or asynchronously:

- Synchronously injected providers is available by the time the dApp starts it's execution.
- Asynchronously injected providers may not become available until a later time in the page lifecycle.

As an example, the MetaMask extension provider is injected synchronously. But the MetaMask mobile provider is injected asynchronously. To notify dApps of asynchronous injection, MetaMask dispatches the ethereum#initialized event on window immediately after the provider has been set as window.ethereum.

However, We can't ensure that all wallets work the the way as MetaMsk. for example, some wallets don't fire the `ethereum#initialized` event properly when the provider is injected asynchronously. To make sure that we are able retrieve the provider correctly, we need to periodically check/poll for the existence of the provider from the host environment.

## References

- [MetaMask/detect-provider](https://github.com/MetaMask/detect-provider#synchronous-and-asynchronous-injection=)
