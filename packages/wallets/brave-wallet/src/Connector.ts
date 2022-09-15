import type { ConnectorOptions, Provider, WalletName } from '@web3-wallet/core';
import { Injected } from '@web3-wallet/injected';

export type BraveWalletProvider = Provider & {
  isBraveWallet?: boolean;
};

export type BraveWalletOptions = ConnectorOptions;

export const walletName = 'Brave Wallet' as WalletName<'Brave Wallet'>;
const providerFilter = (p: BraveWalletProvider) => !!p.isBraveWallet;

export class BraveWallet extends Injected<
  BraveWalletProvider,
  BraveWalletOptions
> {
  /** {@inheritdoc Connector.constructor} */
  constructor(options?: BraveWalletOptions) {
    super(walletName, options);
  }

  /** {@inheritdoc Connector.detectProvider} */
  public override async detectProvider(): Promise<BraveWalletProvider> {
    return await super.detectProvider(providerFilter);
  }
}
