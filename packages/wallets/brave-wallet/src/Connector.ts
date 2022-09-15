import type { ConnectorOptions, Provider, WalletName } from '@web3-wallet/core';
import { Connector } from '@web3-wallet/core';

export type BraveWalletProvider = Provider & {
  isBraveWallet?: boolean;
};

export type BraveWalletOptions = ConnectorOptions;

const _name = 'Brave Wallet';
export const name = _name as WalletName<typeof _name>;

const providerFilter = (p: BraveWalletProvider) => !!p.isBraveWallet;

export class BraveWallet extends Connector<
  BraveWalletProvider,
  BraveWalletOptions
> {
  /** {@inheritdoc Connector.constructor} */
  constructor(options?: BraveWalletOptions) {
    super(name, options);
  }

  /** {@inheritdoc Connector.detectProvider} */
  public override async detectProvider(): Promise<BraveWalletProvider> {
    return await super.detectProvider(providerFilter);
  }
}
