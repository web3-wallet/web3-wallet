import { type Provider, AbstractConnector } from '@web3-wallet/core';

type InjectedProviders<P> = {
  providers?: P[];
};
type InjectedProvider<P> = P | InjectedProviders<P> | undefined;

export type ProviderFilter<P> = (provider: P) => boolean;

export abstract class InjectedConnector<
  P extends Provider,
> extends AbstractConnector<P> {
  public provider?: P;

  public async detectProvider(
    providerFilter: ProviderFilter<P> = () => true,
  ): Promise<P> {
    if (this.provider) this.provider;

    const m = await import('@metamask/detect-provider');

    const injectedProvider = (await m.default()) as InjectedProvider<P>;

    if (!injectedProvider) throw this.providerNotFoundError;

    let provider = injectedProvider as P | undefined;

    /**
     * handle the case when e.g. metamask and coinbase wallet are both installed
     * */
    if ((injectedProvider as InjectedProviders<P>).providers?.length) {
      provider = (injectedProvider as InjectedProviders<P>).providers?.find(
        providerFilter,
      );
    } else {
      provider = provider && providerFilter(provider) ? provider : undefined;
    }

    if (!provider) {
      throw this.providerNotFoundError;
    }

    this.provider = provider;

    return provider;
  }
}
