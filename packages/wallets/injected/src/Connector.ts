import {
  type Provider,
  EthereumConnector,
  ProviderNoFoundError,
} from '@web3-wallet/ethereum';

export type InjectedProvider = Provider & {
  providers?: InjectedProvider[];
};

const providerNotFoundError = new ProviderNoFoundError('Provider not found');

export type ProviderFilter<P> = (provider: P) => boolean;

export abstract class InjectedConnector extends EthereumConnector {
  public provider?: InjectedProvider;

  public async detectProvider(
    providerFilter: ProviderFilter<InjectedProvider> = () => true,
  ): Promise<InjectedProvider> {
    if (this.provider) this.provider;

    const m = await import('@metamask/detect-provider');

    const provider = await m.default();

    if (!provider) throw providerNotFoundError;

    this.provider = provider as InjectedProvider;

    /**
     * handle the case when e.g. metamask and coinbase wallet are both installed
     * */
    if (this.provider.providers?.length) {
      this.provider = this.provider.providers.find(providerFilter);
    }

    if (!this.provider || !providerFilter(this.provider)) {
      throw providerNotFoundError;
    }

    return this.provider;
  }
}
