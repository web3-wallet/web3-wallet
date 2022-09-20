import type { ConnectorOptions, Provider, WalletName } from '@web3-wallet/core';
import { Connector } from '@web3-wallet/core';

export type CryptocomDesktopWalletProvider = Provider & {
  isDesktopWallet?: boolean;
};

export type CryptocomDesktopWalletOptions = ConnectorOptions;

const _name = 'Crypto.com DeFi Desktop Wallet';
export const name = _name as WalletName<typeof _name>;

const providerFilter = (p: CryptocomDesktopWalletProvider) => {
  return !!p.isDesktopWallet;
};

export class CryptocomDesktopWallet extends Connector<
  CryptocomDesktopWalletProvider,
  CryptocomDesktopWalletOptions
> {
  /** {@inheritdoc Connector.constructor} */
  constructor(options?: CryptocomDesktopWalletOptions) {
    super(name, options);
  }

  /** {@inheritdoc Connector.detectProvider} */
  public override async detectProvider(): Promise<CryptocomDesktopWalletProvider> {
    return await super.detectProvider(providerFilter);
  }
}
