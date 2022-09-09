import type { Provider, WalletName, WalletOptions } from '@web3-wallet/core';
import { Injected } from '@web3-wallet/injected';

export type CryptocomDesktopWalletProvider = Provider & {
  isDesktopWallet?: boolean;
};

export type CryptocomDesktopWalletOptions = WalletOptions<undefined>;

export const walletName =
  'Crypto.com Desktop Wallet' as WalletName<'Crypto.com Desktop Wallet'>;

const providerFilter = (p: CryptocomDesktopWalletProvider) => {
  return !!p.isDesktopWallet;
};

export class CryptocomDesktopWallet extends Injected<
  CryptocomDesktopWalletProvider,
  CryptocomDesktopWalletOptions
> {
  /** {@inheritdoc Connector.constructor} */
  constructor(options?: CryptocomDesktopWalletOptions) {
    super(walletName, options);
  }

  /** {@inheritdoc Connector.detectProvider} */
  public override async detectProvider(): Promise<CryptocomDesktopWalletProvider> {
    return await super.detectProvider(providerFilter);
  }
}
