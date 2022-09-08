import type { Connector, Provider, WalletName } from '@web3-wallet/core';
import { Injected } from '@web3-wallet/injected';

export type CryptocomDesktopWalletProvider = Provider & {
  isDesktopWallet?: boolean;
};

export const walletName =
  'Crypto.com Desktop Wallet' as WalletName<'Crypto.com Desktop Wallet'>;

const providerFilter = (p: CryptocomDesktopWalletProvider) => {
  return !!p.isDesktopWallet;
};

export class CryptocomDesktopWallet extends Injected<CryptocomDesktopWalletProvider> {
  constructor(actions: Connector['actions'], onError?: Connector['onError']) {
    super(walletName, actions, onError);
  }

  public override async detectProvider(): Promise<CryptocomDesktopWalletProvider> {
    return await super.detectProvider(providerFilter);
  }
}
