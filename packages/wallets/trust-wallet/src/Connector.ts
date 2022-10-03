import type { Provider, WalletName } from '@web3-wallet/core';
import { Connector } from '@web3-wallet/core';

export type TrustWalletProvider = Provider & {
  isTrust?: boolean;
};
const providerFilter = (p: Provider) => !!p.isTrust;

const _name = 'Trust Wallet';
export const name = _name as WalletName<typeof _name>;

export class TrustWallet extends Connector {
  override providerFilter = providerFilter;
  /** {@inheritdoc Connector.constructor} */
  constructor(options?: Connector['options']) {
    super(name, options);
  }
}
