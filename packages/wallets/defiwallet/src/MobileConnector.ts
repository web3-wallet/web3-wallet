import type { Actions, Connector, WalletName } from '@web3-wallet/core';
import {
  type InjectedProvider,
  InjectedConnector,
} from '@web3-wallet/injected';

export type MobileProvider = InjectedProvider & {
  isTrust?: boolean;
};

const walletName = 'DeFi Wallet' as WalletName<'DeFi Wallet'>;

const providerFilter = (p: MobileProvider) =>
  !!p.isTrust && window.navigator?.userAgent?.includes('DeFiWallet');

export class MobileConnector extends InjectedConnector {
  constructor(actions: Actions, onError?: Connector['onError']) {
    super(walletName, actions, onError);
  }

  public override async detectProvider() {
    return await super.detectProvider(providerFilter);
  }
}
