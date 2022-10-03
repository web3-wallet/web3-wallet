import type { Provider, WalletName } from '@web3-wallet/core';
import { Connector } from '@web3-wallet/core';

const providerFilter = (p: Provider) => !!p.isBraveWallet;

const _name = 'Brave Wallet';
export const name = _name as WalletName<typeof _name>;

export class BraveWallet extends Connector {
  public override providerFilter = providerFilter;

  /** {@inheritdoc Connector.constructor} */
  constructor(options?: Connector['options']) {
    super(name, options);
  }
}
