# @web3-wallet/detect-provider

## context

Wallet providers are usually injected to the host environment(the window object) by the wallet(wallet browser extensions or wallet mobile APPs). In order to talk/connect to a wallet, dApps need to retrieve the wallet provider from the host environment. This library is here to help detect and retrieve the wallet provider from the host environment. @web3-wallet/detect-provider is designed to be able to detect all kinds of wallet providers not just MetaMask provider.

## Synchronous and Asynchronous Injection

Providers can be either synchronously or asynchronously injected:

- Synchronously injected providers will be available by the time website code starts executing.
- Asynchronously injected providers may not become available until later in the page lifecycle.

The MetaMask extension provider is synchronously injected, while the MetaMask mobile provider is
asynchronously injected. notify sites of asynchronous injection, MetaMask dispatches the ethereum#initialized
event on window immediately after the provider has been set as window.ethereum. This package relies on
that event to detect asynchronous injection.

However, We can't ensure that all wallet will fire the `ethereum#initialized` event properly when the provider
is injected asynchronously. To make sure that we can retrieve the provider ASAP, We also need to periodically check/poll
for the existence of the provider from the host environment(window).

## References

- [MetaMask/detect-provider](https://github.com/MetaMask/detect-provider#synchronous-and-asynchronous-injection=)
