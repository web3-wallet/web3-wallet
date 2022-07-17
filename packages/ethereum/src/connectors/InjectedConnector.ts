import type detectEthereumProvider from '@metamask/detect-provider';
import { ProviderFilter } from '@web3-wallet/types';

import type { Actions, Provider } from '../types';
import { ProviderNoFoundError } from '../types';
import { EthereumConnector } from './EthereumConnector';

export type InjectedProvider = Provider & {
  providers?: InjectedProvider[];
};

const providerNotFoundError = new ProviderNoFoundError('Provider not found');

export abstract class InjectedConnector extends EthereumConnector {
  public provider?: InjectedProvider;
  public options?: Parameters<typeof detectEthereumProvider>[0];

  constructor(
    actions: Actions,
    options?: Parameters<typeof detectEthereumProvider>[0],
    onError?: EthereumConnector['onError'],
  ) {
    super(actions, onError);
    this.options = options;
  }

  public async detectProvider(
    providerFilter: ProviderFilter<InjectedProvider> = () => true,
  ): Promise<InjectedProvider> {
    if (this.provider) this.provider;

    const m = await import('@metamask/detect-provider');

    const provider = await m.default(this.options);

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
