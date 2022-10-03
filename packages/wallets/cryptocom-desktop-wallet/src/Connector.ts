import type { Provider, WalletName } from '@web3-wallet/core';
import { Connector } from '@web3-wallet/core';

const _name = 'Crypto.com DeFi Desktop Wallet';
export const name = _name as WalletName<typeof _name>;

const providerFilter = (p: Provider) => {
  return !!p.isDesktopWallet;
};

export class CryptocomDesktopWallet extends Connector {
  public override providerFilter = providerFilter;

  /** {@inheritdoc Connector.constructor} */
  constructor(options?: Connector['options']) {
    super(name, options);
  }
}
