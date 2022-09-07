import type {
  AbstractConnector,
  Provider,
  WalletName,
  WalletStoreActions,
} from '@web3-wallet/core';
import type { ProviderFilter } from '@web3-wallet/injected';
import { Injected } from '@web3-wallet/injected';

export type MobileProvider = Provider & {
  isTrust?: boolean;
};

export const walletName = 'DeFi Wallet' as WalletName<'DeFi Wallet'>;

const providerFilter: ProviderFilter<MobileProvider> = (p) =>
  !!p.isTrust && window.navigator?.userAgent?.includes('DeFiWallet');

export class DeFiWalletMobile extends Injected<MobileProvider> {
  constructor(
    actions: WalletStoreActions,
    onError?: AbstractConnector['onError'],
  ) {
    super(walletName, actions, onError);
  }

  public override async detectProvider() {
    return await super.detectProvider(providerFilter);
  }
}
