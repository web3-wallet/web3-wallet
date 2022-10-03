import type { Provider, WalletName } from '@web3-wallet/core';
import { Connector } from '@web3-wallet/core';

const providerFilter = (p: Provider) => !!p.isImToken;

const _name = 'imToken';
export const name = _name as WalletName<typeof _name>;

export class ImToken extends Connector {
  public override providerFilter = providerFilter;

  /** {@inheritdoc Connector.constructor} */
  constructor(options?: Connector['options']) {
    super(name, options);
  }
}
