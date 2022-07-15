import type detectEthereumProvider from '@metamask/detect-provider';
import type {
  Actions,
  Provider,
  ProviderFilter,
} from '@web3-wallet/abstract-connector';
import { ProviderNoFoundError } from '@web3-wallet/abstract-connector';
import { EthereumConnector } from '@web3-wallet/ethereum-connector';

export type MetaMaskCompatibleProvider = Provider & {
  isMetaMask?: boolean;
  isConnected?: () => boolean;
  providers?: MetaMaskCompatibleProvider[];
};

/**
 * @param options - Options to pass to `@metamask/detect-provider`
 * @param onError - Handler to report errors thrown from eventListeners.
 */
export interface MetaMaskCompatibleConstructorArgs {
  actions: Actions;
  options?: Parameters<typeof detectEthereumProvider>[0];
  onError?: EthereumConnector['onError'];
}

const providerNotFoundError = new ProviderNoFoundError('Provider not found');

const defaultProviderFilter = (p: MetaMaskCompatibleProvider) =>
  !!p?.isMetaMask;
export abstract class MetaMaskCompatible extends EthereumConnector {
  public override provider?: MetaMaskCompatibleProvider;
  private options?: Parameters<typeof detectEthereumProvider>[0];

  constructor({
    actions,
    options,
    onError,
  }: MetaMaskCompatibleConstructorArgs) {
    super(actions, onError);
    this.options = options;
  }

  public detectProvider = async (providerFilter?: ProviderFilter) => {
    if (this.provider) this.provider;

    const m = await import('@metamask/detect-provider');

    const provider = await m.default(this.options);

    if (!provider) throw providerNotFoundError;

    this.provider = provider as MetaMaskCompatibleProvider;

    providerFilter = providerFilter || defaultProviderFilter;

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
  };
}
