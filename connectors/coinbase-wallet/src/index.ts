import type {
  CoinbaseWalletProvider,
  CoinbaseWalletSDK,
} from '@coinbase/wallet-sdk';
import {
  Actions,
  AddEthereumChainParameter,
  Connector,
  ProviderConnectInfo,
  ProviderNoFoundError,
  ProviderRpcError,
  WatchAssetParameters,
} from '@web3-wallet/types';
import { parseEvmChainId } from '@web3-wallet/utils';

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
  public provider?: CoinbaseWalletProvider;

  private readonly options: CoinbaseWalletSDKOptions;
  private lazyInitialized = false;

  /**
   * A `CoinbaseWalletSDK` instance.
   */
  public coinbaseWallet?: CoinbaseWalletSDK;

  constructor({ actions, options, onError }: CoinbaseWalletConstructorArgs) {
    super(actions, onError);
    this.options = options;
  }

  // the `connected` property, is bugged, but this works as a hack to check connection status
  private get connected(): boolean {
    return !!this.provider?.selectedAddress;
  }

  public detectProvider = async () => {
    if (this.provider) this.provider;

    const m = await import('@coinbase/wallet-sdk');
    this.coinbaseWallet = new m.default(this.options);
    this.provider = this.coinbaseWallet.makeWeb3Provider();

    return this.provider;
  };

  private async lazyInitialize(): Promise<void> {
    if (this.lazyInitialized) return;

    try {
      const provider = await this.detectProvider();
      provider.on('connect', ({ chainId }: ProviderConnectInfo): void => {
        this.actions.update({ chainId: parseEvmChainId(chainId) });
      });

      provider.on('disconnect', (error: ProviderRpcError): void => {
        this.actions.resetState();
        this.onError?.(error);
      });

      provider.on('chainChanged', (chainId: string): void => {
        this.actions.update({ chainId: parseEvmChainId(chainId) });
      });

      provider.on('accountsChanged', (accounts: string[]): void => {
        if (accounts.length === 0) {
          // handle this edge case by disconnecting
          this.actions.resetState();
        } else {
          this.actions.update({ accounts });
        }
      });
    } finally {
      this.lazyInitialized = true;
    }
  }

  /** {@inheritdoc Connector.connectEagerly} */
  public async connectEagerly(): Promise<void> {
    const cancelActivation = this.actions.startActivation();

    try {
      await this.lazyInitialize();
      if (!this.connected) throw new Error('No existing connection');

      return Promise.all([
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.provider!.request<string>({ method: 'eth_chainId' }),
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.provider!.request<string[]>({ method: 'eth_accounts' }),
      ]).then(([chainId, accounts]) => {
        if (!accounts.length) throw new Error('No accounts returned');
        this.actions.update({ chainId: parseEvmChainId(chainId), accounts });
      });
    } catch (error) {
      cancelActivation();
      throw error;
    }
  }

  private switchChain = async (
    desiredChainIdOrChainParameters: number | AddEthereumChainParameter,
  ): Promise<void> => {
    try {
      await this.lazyInitialize();
    } catch (_) {
      throw providerNotFoundError;
    }

    const desiredChainId =
      typeof desiredChainIdOrChainParameters === 'number'
        ? desiredChainIdOrChainParameters
        : desiredChainIdOrChainParameters.chainId;

    const desiredChainIdHex = `0x${desiredChainId.toString(16)}`;

    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      await this.provider!.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: desiredChainIdHex }],
      });
    } catch (err: unknown) {
      const error = err as ProviderRpcError;
      const shouldTryToAddChain =
        desiredChainIdOrChainParameters &&
        typeof desiredChainIdOrChainParameters !== 'number' &&
        (error.code === 4902 || error.code === -32603);

      if (!shouldTryToAddChain) throw error;
      // if we're here, we can try to add a new network
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      await this.provider!.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            ...desiredChainIdOrChainParameters,
            chainId: desiredChainIdHex,
          },
        ],
      });

      /**
       * chain added successfully, try activate again with the added chain
       */
      await this.activate(desiredChainId);
    }
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
  public async activate(
    desiredChainIdOrChainParameters?: number | AddEthereumChainParameter,
  ): Promise<void> {
    try {
      await this.lazyInitialize();
    } catch (_) {
      throw providerNotFoundError;
    }

    const desiredChainId =
      typeof desiredChainIdOrChainParameters === 'number'
        ? desiredChainIdOrChainParameters
        : desiredChainIdOrChainParameters?.chainId;

    let cancelActivation: () => void = () => {};

    if (!this.connected) {
      cancelActivation = this.actions.startActivation();
    }

    try {
      const [chainId, accounts] = await Promise.all([
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.provider!.request<string>({ method: 'eth_chainId' }),
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.provider!.request<string[]>({ method: 'eth_requestAccounts' }),
      ]);
      const receivedChainId = parseEvmChainId(chainId);

      if (!desiredChainId || desiredChainId === receivedChainId) {
        return this.actions.update({ chainId: receivedChainId, accounts });
      }

      // if we're here, we can try to switch networks
      await this.switchChain(
        desiredChainIdOrChainParameters as number | AddEthereumChainParameter,
      );
    } catch (error) {
      cancelActivation();
      throw error;
    }
  }

  /** {@inheritdoc Connector.deactivate} */
  public deactivate(): void {
    this.coinbaseWallet?.disconnect();
  }

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
