import type {
  AbstractConnector,
  Actions,
  Provider,
  WalletName,
} from '@web3-wallet/core';
import type { ProviderFilter } from '@web3-wallet/injected';
import { InjectedConnector } from '@web3-wallet/injected';

export type MobileProvider = Provider & {
  isTrust?: boolean;
};

export const walletName = 'DeFi Wallet' as WalletName<'DeFi Wallet'>;

const providerFilter: ProviderFilter<MobileProvider> = (p) =>
  !!p.isTrust && window.navigator?.userAgent?.includes('DeFiWallet');

export class MobileConnector extends InjectedConnector<MobileProvider> {
  constructor(actions: Actions, onError?: AbstractConnector['onError']) {
    super(walletName, actions, onError);
  }

  public override async detectProvider() {
    return await super.detectProvider(providerFilter);
  }
}
