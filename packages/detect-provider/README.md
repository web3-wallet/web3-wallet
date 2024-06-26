# @react-web3-wallet/detect-provider

## Install

```base
pnpm add @react-web3-wallet/detect-provider
```

## Usage

```typescript
import { detectProvider } from '@react-web3-wallet/detect-provider';

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

In most cases, wallet providers are injected into the host environment. This means that to connect a dApp to a wallet, the dApp needs to retrieve the wallet provider from the host environment. The @react-web3-wallet/detect-provider library is designed to simplify this process.

By using @react-web3-wallet/detect-provider, you can detect and retrieve wallet providers from the host environment, regardless of the specific type of wallet being used. This ensures that your dApp can seamlessly connect to the user's chosen wallet provider.

## Synchronous and Asynchronous Injection

Wallet providers can be injected into the host environment either synchronously or asynchronously. Synchronously injected providers are available immediately when the dApp starts executing, while asynchronously injected providers may not become available until a later point in the page lifecycle.

For example, the MetaMask extension provider is injected synchronously, while the MetaMask mobile provider is injected asynchronously. To notify dApps of asynchronous injection, MetaMask dispatches the ethereum#initialized event on the window object immediately after the provider has been set as window.ethereum.

However, it's important to note that not all wallets follow the same injection pattern as MetaMask. Some wallets may not fire the ethereum#initialized event properly when the provider is injected asynchronously. In such cases, you may need to periodically check or poll for the existence of the provider from the host environment to ensure that you can retrieve it correctly.

## References

- [MetaMask/detect-provider](https://github.com/MetaMask/detect-provider#synchronous-and-asynchronous-injection=)
