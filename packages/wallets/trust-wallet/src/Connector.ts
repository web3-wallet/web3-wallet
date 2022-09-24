import type { ConnectorOptions, Provider, WalletName } from '@web3-wallet/core';
import { Connector } from '@web3-wallet/core';

export type TrustWalletProvider = Provider & {
  isTrust?: boolean;
};
const providerFilter = (p: TrustWalletProvider) => !!p.isTrust;

export type TrustWalletOptions = ConnectorOptions;

const _name = 'Trust Wallet';
export const name = _name as WalletName<typeof _name>;

export class TrustWallet extends Connector<TrustWalletOptions> {
  override providerFilter = providerFilter;
  /** {@inheritdoc Connector.constructor} */
  constructor(options?: TrustWalletOptions) {
    super(name, options);
  }
}
