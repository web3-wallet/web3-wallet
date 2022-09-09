import type { Provider, WalletName, WalletOptions } from '@web3-wallet/core';
import { Injected } from '@web3-wallet/injected';

export type MetaMaskProvider = Provider & {
  isMetaMask?: boolean;
};

export type MetaMaskOptions = WalletOptions<undefined>;

export const walletName = 'MetaMask' as WalletName<'MetaMask'>;
const providerFilter = (p: MetaMaskProvider) => !!p.isMetaMask;

export class MetaMask extends Injected<MetaMaskProvider, MetaMaskOptions> {
  /** {@inheritdoc Connector.constructor} */
  constructor(options?: MetaMaskOptions) {
    super(walletName, options);
  }

  /** {@inheritdoc Connector.detectProvider} */
  public override async detectProvider(): Promise<MetaMaskProvider> {
    return await super.detectProvider(providerFilter);
  }
}
