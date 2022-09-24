import type { ConnectorOptions, Provider, WalletName } from '@web3-wallet/core';
import { Connector } from '@web3-wallet/core';

export type BraveWalletProvider = Provider & {
  isBraveWallet?: boolean;
};

const providerFilter = (p: BraveWalletProvider) => !!p.isBraveWallet;

export type BraveWalletOptions = ConnectorOptions;

const _name = 'Brave Wallet';
export const name = _name as WalletName<typeof _name>;

export class BraveWallet extends Connector<BraveWalletOptions> {
  public override providerFilter = providerFilter;

  /** {@inheritdoc Connector.constructor} */
  constructor(options?: BraveWalletOptions) {
    super(name, options);
  }
}
