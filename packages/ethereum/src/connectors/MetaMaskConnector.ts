import { InjectedConnector, InjectedProvider } from './InjectedConnector';

export type MetaMaskProvider = InjectedProvider & {
  isMetaMask?: boolean;
};

const providerFilter = (p: MetaMaskProvider) => !!p.isMetaMask;
export class MetaMaskConnector extends InjectedConnector {
  public override async detectProvider(): Promise<MetaMaskProvider> {
    return await super.detectProvider(providerFilter);
  }
}
