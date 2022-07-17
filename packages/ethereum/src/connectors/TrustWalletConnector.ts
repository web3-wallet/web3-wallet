import { type InjectedProvider, InjectedConnector } from './InjectedConnector';

export type TrustWalletProvider = InjectedProvider & {
  isTrust?: boolean;
};

const providerFilter = (p: TrustWalletProvider) => !!p.isTrust;

export class TrustWallet extends InjectedConnector {
  public override async detectProvider() {
    return await super.detectProvider(providerFilter);
  }
}
