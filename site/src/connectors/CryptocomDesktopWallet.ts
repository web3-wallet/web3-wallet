import { InjectedConnector } from '@web3-wallet/injected';
import type {
  AbstractConnector,
  Provider,
  WalletName,
} from '@web3-wallet/react';

export type CryptocomDesktopWalletProvider = Provider & {
  isDesktopWallet?: boolean;
};

export const walletName =
  'Crypto.com Desktop Wallet' as WalletName<'Crypto.com Desktop Wallet'>;

const providerFilter = (p: CryptocomDesktopWalletProvider) => {
  return !!p.isDesktopWallet;
};

export class CryptocomDesktopWalletConnector extends InjectedConnector<CryptocomDesktopWalletProvider> {
  constructor(
    actions: AbstractConnector['actions'],
    onError?: AbstractConnector['onError'],
  ) {
    super(walletName, actions, onError);
  }

  public override async detectProvider(): Promise<CryptocomDesktopWalletProvider> {
    return await super.detectProvider(providerFilter);
  }
}
