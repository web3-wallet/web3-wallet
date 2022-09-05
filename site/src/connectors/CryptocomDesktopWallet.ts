import { InjectedConnector } from '@web3-wallet/injected';
import type {
  AbstractConnector,
  Provider,
  WalletName,
} from '@web3-wallet/react';

export type MetaMaskProvider = Provider & {
  isMetaMask?: boolean;
};

export const walletName =
  'Crypto.com Desktop Wallet' as WalletName<'Crypto.com Desktop Wallet'>;

const providerFilter = () => {
  if (typeof window !== 'undefined') {
    return window.navigator?.userAgent?.includes('Desktop Wallet');
  }
  return false;
};

export class CryptocomDesktopWalletConnector extends InjectedConnector<MetaMaskProvider> {
  constructor(
    actions: AbstractConnector['actions'],
    onError?: AbstractConnector['onError'],
  ) {
    super(walletName, actions, onError);
  }

  public override async detectProvider(): Promise<MetaMaskProvider> {
    return await super.detectProvider(providerFilter);
  }
}
