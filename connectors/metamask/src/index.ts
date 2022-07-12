import type detectEthereumProvider from '@metamask/detect-provider';
import type {
  Actions,
  AddEthereumChainParameter,
  Provider,
  WatchAssetParameters,
} from '@web3-wallet/types';
import { Connector, ProviderNoFoundError } from '@web3-wallet/types';

type MetaMaskProvider = Provider & {
  isMetaMask?: boolean;
  isConnected?: () => boolean;
  providers?: MetaMaskProvider[];
};

/**
 * @param options - Options to pass to `@metamask/detect-provider`
 * @param onError - Handler to report errors thrown from eventListeners.
 */
export interface MetaMaskConstructorArgs {
  actions: Actions;
  options?: Parameters<typeof detectEthereumProvider>[0];
  onError?: (error: Error) => void;
}

const providerNotFoundError = new ProviderNoFoundError(
  'MetaMask provider not found',
);

export class MetaMask extends Connector {
  /** {@inheritdoc Connector.provider} */
  public override provider?: MetaMaskProvider;

  private readonly options?: Parameters<typeof detectEthereumProvider>[0];

  constructor({ actions, options, onError }: MetaMaskConstructorArgs) {
    super(actions, onError);
    this.options = options;
  }

  public detectProvider = async () => {
    if (this.provider) this.provider;

    const m = await import('@metamask/detect-provider');

    const provider = await m.default(this.options);

    if (!provider) throw providerNotFoundError;

    this.provider = provider as MetaMaskProvider;

    // handle the case when e.g. metamask and coinbase wallet are both installed
    if (this.provider.providers?.length) {
      this.provider =
        this.provider.providers.find((p) => p.isMetaMask) ??
        this.provider.providers[0];
    }

    return this.provider;
  };

  protected addEventListener(): void {
    if (!this.provider) return;
    this.provider.on('connect', this.onConnect);
    this.provider.on('disconnect', this.onDisconnect);
    this.provider.on('chainChanged', this.onChainIdChanged);
    this.provider.on('accountsChanged', this.onAccountsChanged);
  }

  protected removeEventListener(): void {
    if (!this.provider) return;
    this.provider.off('connect', this.onConnect);
    this.provider.off('disconnect', this.onDisconnect);
    this.provider.off('chainChanged', this.onChainIdChanged);
    this.provider.off('accountsChanged', this.onAccountsChanged);
  }

  protected requestAccounts = async (): Promise<string[]> => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return await this.provider!.request<string[]>({
      method: 'eth_requestAccounts',
    });
  };

  protected requestChainId = async (): Promise<string> => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return await this.provider!.request({ method: 'eth_chainId' });
  };

  protected switchChain = async (chainId: number): Promise<void> => {
    if (!this.provider) throw providerNotFoundError;

    const hexChainIdHex = `0x${chainId.toString(16)}`;

    await this.provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: hexChainIdHex }],
    });
  };

  protected addChain = async (
    addChainParameter: AddEthereumChainParameter,
  ): Promise<void> => {
    if (!this.provider) throw providerNotFoundError;
    const hexChainIdHex = `0x${addChainParameter.chainId.toString(16)}`;

    await this.provider.request({
      method: 'wallet_addEthereumChain',
      params: [{ ...addChainParameter, chainId: hexChainIdHex }],
    });
  };

  public override async watchAsset({
    address,
    symbol,
    decimals,
    image,
  }: WatchAssetParameters): Promise<true> {
    if (!this.provider) throw providerNotFoundError;

    const success = await this.provider.request<boolean>({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address, // The address that the token is at.
          symbol, // A ticker symbol or shorthand, up to 5 chars.
          decimals, // The number of decimals in the token
          image, // A string url of the token logo
        },
      },
    });

    if (!success) throw new Error('Rejected');
    return true;
  }
}
