import type {
  CoinbaseWalletProvider,
  CoinbaseWalletSDK,
} from '@coinbase/wallet-sdk';
import {
  Actions,
  AddEthereumChainParameter,
  Connector,
  ProviderNoFoundError,
  WatchAssetParameters,
} from '@web3-wallet/connector';

type CoinbaseWalletSDKOptions = ConstructorParameters<
  typeof CoinbaseWalletSDK
>[0];

/**
 * @param options - Options to pass to `@coinbase/wallet-sdk`.
 * @param onError - Handler to report errors thrown from eventListeners.
 */
export interface CoinbaseWalletConstructorArgs {
  actions: Actions;
  options: CoinbaseWalletSDKOptions;
  onError?: (error: Error) => void;
}

const providerNotFoundError = new ProviderNoFoundError(
  'Coinbase wallet provider not found',
);

export class CoinbaseWallet extends Connector {
  /** {@inheritdoc Connector.provider} */
  public override provider?: CoinbaseWalletProvider;

  private readonly options: CoinbaseWalletSDKOptions;

  /**
   * A `CoinbaseWalletSDK` instance.
   */
  public coinbaseWallet?: CoinbaseWalletSDK;

  constructor({ actions, options, onError }: CoinbaseWalletConstructorArgs) {
    super(actions, onError);
    this.options = options;
  }

  public detectProvider = async () => {
    if (this.provider) this.provider;

    const m = await import('@coinbase/wallet-sdk');
    this.coinbaseWallet = new m.default(this.options);
    this.provider = this.coinbaseWallet.makeWeb3Provider();

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
  /**
   * Initiates a connection.
   *
   * @param desiredChainIdOrChainParameters - If defined, indicates the desired chain to connect to. If the user is
   * already connected to this chain, no additional steps will be taken. Otherwise, the user will be prompted to switch
   * to the chain, if one of two conditions is met: either they already have it added, or the argument is of type
   * AddEthereumChainParameter, in which case the user will be prompted to add the chain with the specified parameters
   * first, before being prompted to switch.
   */

  /** {@inheritdoc Connector.deactivate} */
  public override deactivate = async (): Promise<void> => {
    this.coinbaseWallet?.disconnect();
    this.coinbaseWallet = undefined;
    super.deactivate();
  };

  public async watchAsset({
    address,
    symbol,
    decimals,
    image,
  }: Pick<WatchAssetParameters, 'address'> &
    Partial<Omit<WatchAssetParameters, 'address'>>): Promise<true> {
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
