import type { ConnectorOptions, Provider, WalletName } from '@web3-wallet/core';
import { Injected } from '@web3-wallet/injected';

export type MetaMaskProvider = Provider & {
  isMetaMask?: boolean;
};

export type MetaMaskOptions = ConnectorOptions;

const _name = 'MetaMask';
export const name = _name as WalletName<typeof _name>;
const providerFilter = (p: MetaMaskProvider) => !!p.isMetaMask;

export class MetaMask extends Injected<MetaMaskProvider, MetaMaskOptions> {
  /** {@inheritdoc Connector.constructor} */
  constructor(options?: MetaMaskOptions) {
    super(name, options);
  }

  /** {@inheritdoc Connector.detectProvider} */
  public override async detectProvider(): Promise<MetaMaskProvider> {
    return await super.detectProvider(providerFilter);
  }
}
