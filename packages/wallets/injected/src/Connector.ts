import { type Provider, Connector } from '@web3-wallet/core';

export type InjectedProvider = Provider & {
  providers?: InjectedProvider[];
};

export type ProviderFilter<P> = (provider: P) => boolean;

export abstract class InjectedConnector extends Connector {
  public provider?: InjectedProvider;

  public async detectProvider(
    providerFilter: ProviderFilter<InjectedProvider> = () => true,
  ): Promise<InjectedProvider> {
    if (this.provider) this.provider;

    const m = await import('@metamask/detect-provider');

    const provider = await m.default();

    if (!provider) throw this.providerNotFoundError;

    this.provider = provider as InjectedProvider;

    /**
     * handle the case when e.g. metamask and coinbase wallet are both installed
     * */
    if (this.provider.providers?.length) {
      this.provider = this.provider.providers.find(providerFilter);
    }

    if (!this.provider || !providerFilter(this.provider)) {
      throw this.providerNotFoundError;
    }

    return this.provider;
  }
}
