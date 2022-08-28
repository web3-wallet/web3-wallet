import {
  type InjectedProvider,
  InjectedConnector,
} from '@web3-wallet/injected';

export type MobileProvider = InjectedProvider & {
  isTrust?: boolean;
};

const providerFilter = (p: MobileProvider) =>
  !!p.isTrust && window.navigator?.userAgent?.includes('DeFiWallet');

export class MobileConnector extends InjectedConnector {
  public override async detectProvider() {
    return await super.detectProvider(providerFilter);
  }
}
