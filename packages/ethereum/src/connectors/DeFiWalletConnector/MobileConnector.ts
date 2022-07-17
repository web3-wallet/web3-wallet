import { type InjectedProvider, InjectedConnector } from '../InjectedConnector';

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
