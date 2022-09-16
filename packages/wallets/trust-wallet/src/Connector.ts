import type { ConnectorOptions, Provider, WalletName } from '@web3-wallet/core';
import { Connector } from '@web3-wallet/core';

export type TrustWalletProvider = Provider & {
  isTrust?: boolean;
};

export type TrustWalletOptions = ConnectorOptions;

const _name = 'Trust Wallet';
export const name = _name as WalletName<typeof _name>;

const providerFilter = (p: TrustWalletProvider) => !!p.isTrust;

export class TrustWallet extends Connector<
  TrustWalletProvider,
  TrustWalletOptions
> {
  /** {@inheritdoc Connector.constructor} */
  constructor(options?: TrustWalletOptions) {
    super(name, options);
  }

  /** {@inheritdoc Connector.detectProvider} */
  public override async detectProvider(): Promise<TrustWalletProvider> {
    return await super.detectProvider(providerFilter);
  }
}
