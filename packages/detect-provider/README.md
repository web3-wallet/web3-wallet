# @web3-wallet/detect-provider

## context

Wallet providers are usually injected to the host environment(the web browser window object) wallets(wallet browser extensions or wallet mobile APPs). In order to connect to wallets, dApps need to retrieve the wallet providers from the host environment. This library is here to help detect and retrieve the wallet providers from the host environment. @web3-wallet/detect-provider is designed to be able to detect all kinds of wallet providers from the host environment.

## Synchronous and Asynchronous Injection

Providers could be injected synchronously or asynchronously:

- Synchronously injected providers is available by the time the dApp starts it's execution.
- Asynchronously injected providers may not become available until a later time in the page lifecycle.

As a example, the MetaMask extension provider is injected synchronously. But the MetaMask mobile provider is
injected asynchronously. To notify dApps of asynchronous injection, MetaMask dispatches the ethereum#initialized
event on window immediately after the provider has been set as window.ethereum.

However, We can't ensure that all wallet will fire the `ethereum#initialized` event properly when the provider
is injected asynchronously. To make sure that we are able retrieve the provider correctly, We also need to periodically check/poll for the existence of the provider from the host environment.

## References

- [MetaMask/detect-provider](https://github.com/MetaMask/detect-provider#synchronous-and-asynchronous-injection=)
