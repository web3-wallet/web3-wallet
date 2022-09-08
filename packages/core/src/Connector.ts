/* eslint-disable max-lines */
import type {
  Provider,
  WalletName,
  WalletOptions,
  WalletStoreActions,
} from './types';
import {
  type AddEthereumChainParameter,
  type ProviderConnectInfo,
  type ProviderRpcError,
  type WatchAssetParameters,
  ProviderNoFoundError,
} from './types';
import { parseChainId, toHexChainId } from './utils';

const isChainId = (
  chainIdOrChainParameter?: number | AddEthereumChainParameter,
): chainIdOrChainParameter is number => {
  return typeof chainIdOrChainParameter === 'number';
};

const isAddChainParameter = (
  chainIdOrChainParameter?: number | AddEthereumChainParameter,
): chainIdOrChainParameter is AddEthereumChainParameter => {
  return !isChainId(chainIdOrChainParameter);
};

export abstract class Connector<
  P extends Provider = Provider,
  Options extends WalletOptions = WalletOptions,
> {
  /**
   * {@link WalletName}
   **/
  public name: WalletName;
  /**
   * @import { Provider } from './types.ts'
   * {@link Provider}
   **/
  public abstract provider?: P;
  /**
   * The wallet options object, specific to each wallet
   */
  public options: Options;
  /**
   * @import { WalletStoreActions } from './types.ts'
   * {@link WalletStoreActions}
   */
  protected actions: WalletStoreActions;
  /**
   * Report Error thrown by provider to the external world
   *
   * @param error the error object
   */
  public onError?(error?: ProviderRpcError): Promise<void>;

  /**
   * ProviderNoFoundError should be thrown in the following cases
   *  1. detectProvider failed to retrieve the provider from a host environment.
   *  2. calling functions that requires a provider, but we have been unable to retrieve the provider
   */
  protected providerNotFoundError: ProviderNoFoundError;

  /**
   *
   * @param name {@link WalletName}
   * @param actions {@link WalletStoreActions}
   * @param onError {@link Connector#onError}
   */
  constructor(
    name: WalletName,
    actions: WalletStoreActions,
    options: Options,
    onError?: (error: ProviderRpcError) => Promise<void>,
  ) {
    this.name = name;
    this.actions = actions;
    this.options = options;
    this.onError = onError;
    this.providerNotFoundError = new ProviderNoFoundError(
      `${name} provider not found`,
    );
  }

  /**
   * Reset the wallet state to it's default status
   */
  public resetState(): void {
    this.actions.resetState();
  }

  /**
   * Detect provider in host environments.
   *
   * @param providerFilter providerFilter is provided the detected provider as it's input
   *  and providerFilter returns a boolean to indicated wether the detected provider can be used.
   *  1. detectProvider should throw the ProviderNoFoundError if providerFilter returns false
   *  2. detectProvider should throw the ProviderNoFoundError if providerFilter returns false
   *
   * detectProvider is internally called by {@link Connector#lazyInitialize}
   *
   * @return 1. resolve with the provider if the detection succeeded.
   *         2. reject with an ProviderNotFoundError if it failed to retrieve the provider from the host environment.
   */
  public abstract detectProvider(
    providerFilter?: (provider: P) => boolean,
  ): Promise<P>;

  /**
   * `lazyInitialize` does the following two things:
   *   1. triggers the provider detection process {@link Connector#detectProvider}
   *   2. Register event listeners to the provider {@link Connector#addEventListeners}
   *
   * `lazyInitialize` is internally called by the following public methods
   *   - {@link Connector#connect}
   *   - {@link Connector#autoConnect}
   *   - {@link Connector#autoConnectOnce}
   */
  protected async lazyInitialize(): Promise<void> {
    await this.detectProvider();
    this.removeEventListeners = this.addEventListeners();
  }

  /**
   * Try to connect to wallet.
   *
   * autoConnect never reject, it will always resolve.
   *
   * autoConnect only try to connect to wallet, if it don't need any further
   * user interaction with the wallet in the connecting process.
   *
   * @return 1. resolve with `true` if the connection succeeded.
   *         2. resolve with `false` if the connection failed.
   *
   * See also autoConnectOnce {@link Connector#autoConnectOnce}
   */
  public async autoConnect(): Promise<boolean> {
    const endConnection = this.actions.startConnection();

    try {
      await this.lazyInitialize();
      const [chainId, accounts] = await Promise.all([
        this.requestChainId(),
        this.requestAccounts(),
      ]);

      if (!accounts.length) throw new Error('No accounts returned');

      this.updateChainId(chainId);
      this.updateAccounts(accounts);
    } catch (e) {
      console.debug(`Could not auto connect`, e);
      return false;
    } finally {
      endConnection();
    }

    return true;
  }

  private autoConnectOncePromise?: Promise<boolean>;

  /**
   * Same as autoConnect with the exception - autoConnectOnce only try to auto connect once.
   *
   * `autoConnectOnce` in turn calls autoConnect and memorize the return promise.
   * `autoConnectOnce` returns the memorized promise directly for further calls.
   *
   * Calling autoConnectOnce multiple times is no-ops.
   *
   * @return 1. resolve with `true` if the connection succeeded.
   *         2. resolve with `false` if the connection failed.
   *
   * See also autoConnect {@link Connector#autoConnect}
   */
  public async autoConnectOnce(): Promise<boolean> {
    if (!this.autoConnectOncePromise) {
      this.autoConnectOncePromise = this.autoConnect();
    }
    return await this.autoConnectOncePromise;
  }

  /**
   * Initiates a connection.
   *
   * @param chainIdOrChainParameter - If defined, indicates the desired chain to connect to. If the user is
   * already connected to this chain, no additional steps will be taken. Otherwise, the user will be prompted to switch
   * to the chain, if one of two conditions is met: either they already have it added in their extension, or the
   * argument is of type AddEthereumChainParameter, in which case the user will be prompted to add the chain with the
   * specified parameters first, before being prompted to switch.
   */
  public async connect(
    chainIdOrChainParameter?: number | AddEthereumChainParameter,
  ): Promise<void> {
    const endConnection = this.actions.startConnection();

    try {
      await this.lazyInitialize();

      if (!this.provider) throw this.providerNotFoundError;

      const [chainId, accounts] = await Promise.all([
        this.requestChainId(),
        this.requestAccounts(),
      ]);

      const receivedChainId = parseChainId(chainId);
      const desiredChainId =
        typeof chainIdOrChainParameter === 'number'
          ? chainIdOrChainParameter
          : chainIdOrChainParameter?.chainId;

      // if there's no desired chain, or it's equal to the received, update
      if (!desiredChainId || receivedChainId === desiredChainId) {
        this.updateChainId(receivedChainId);
        this.updateAccounts(accounts);
        return;
      }

      try {
        await this.switchChain(desiredChainId);
        return this.actions.update({ chainId: desiredChainId, accounts });
      } catch (err: unknown) {
        const error = err as ProviderRpcError;

        const shouldTryToAddChain =
          isAddChainParameter(chainIdOrChainParameter) &&
          (error.code === 4902 || error.code === -32603);

        // can't handle the error, throw it again
        if (!this.addChain || !shouldTryToAddChain) throw error;

        // if we're here, we can try to add a new network
        await this.addChain(chainIdOrChainParameter);

        // chain added, connect the added chainId again
        await this.connect(chainIdOrChainParameter.chainId);
      }
    } finally {
      endConnection();
    }
  }

  /**
   * Disconnect wallet
   *
   * Wallet connector implementors should override this method if the wallet supports
   * force disconnect.
   *
   * What is force disconnect?
   *   - force disconnect will actually disconnect the wallet.
   *   - non-disconnect only sets the connectionId in wallet store to `undefined`.
   *
   * For some wallets, MetaMask for example, there're not ways to force disconnect MetaMask.
   * For some wallets, Walletconnect for example, we are able to force disconnect Walletconnect.
   * @param _force  wether to force disconnect to wallet, default is false.
   *
   * @return 1. always resolve for soft disconnect.
   *         2. resolve, if force disconnect succeeded
   *         3. reject, if force disconnect failed
   *
   */
  public async disconnect(_force = false): Promise<void> {
    this.resetState();
  }

  /**
   * @param watchAssetParameters {@link WatchAssetParameters}
   */
  public async watchAsset(
    watchAssetParameters: WatchAssetParameters,
  ): Promise<true> {
    if (!this.provider) throw this.providerNotFoundError;

    const success = await this.provider.request<boolean>({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: watchAssetParameters,
      },
    });

    if (!success)
      throw new Error(`Failed to watch ${watchAssetParameters.symbol}`);

    return true;
  }
  /**
   * Update the wallet store with new the chainId
   *
   * @param chainId
   */
  protected updateChainId(chainId: string | number): void {
    this.actions.update({
      chainId: parseChainId(chainId),
    });
  }

  /**
   * Update the wallet store with new the new accounts
   *
   * @param accounts
   */
  protected updateAccounts(accounts: string[]): void {
    this.actions.update({ accounts });
  }

  /**
   * wallet connect listener
   */
  protected onConnect({ chainId }: ProviderConnectInfo): void {
    this.updateChainId(chainId);
  }

  /**
   * wallet disconnect listener
   */
  protected onDisconnect(error: ProviderRpcError): void {
    this.onError?.(error);
  }

  /**
   * wallet chainId change listener
   */
  protected onChainChanged(chainId: number | string): void {
    this.updateChainId(chainId);
  }

  /**
   * wallet account change listener
   */
  protected onAccountsChanged(accounts: string[]): void {
    this.updateAccounts(accounts);
  }

  /**
   * Returned from addEventListeners {@link Connector#addEventListeners}
   *
   * don't need to remove event listeners if the provider never recreated in the whole lifecycle
   */
  protected removeEventListeners?: () => void;

  /**
   *  Register event listeners to the provider
   *
   * @return a function to remove the registered event listeners {@link Connector#removeEventListeners}
   */
  protected addEventListeners(): Connector<P>['removeEventListeners'] {
    if (!this.provider) return;

    const onConnect = this.onConnect.bind(this);
    const onDisconnect = this.onDisconnect.bind(this);
    const onChainChanged = this.onChainChanged.bind(this);
    const onAccountsChanged = this.onAccountsChanged.bind(this);

    if (typeof this.provider.on === 'function') {
      this.provider.on('connect', onConnect);
      this.provider.on('disconnect', onDisconnect);
      this.provider.on('chainChanged', onChainChanged);
      this.provider.on('accountsChanged', onAccountsChanged);
    } else {
      this.provider.addListener('connect', onConnect);
      this.provider.addListener('disconnect', onDisconnect);
      this.provider.addListener('chainChanged', onChainChanged);
      this.provider.addListener('accountsChanged', onAccountsChanged);
    }

    return () => {
      if (!this.provider) return;

      if (typeof this.provider.off === 'function') {
        this.provider.off('connect', onConnect);
        this.provider.off('disconnect', onDisconnect);
        this.provider.off('chainChanged', onChainChanged);
        this.provider.off('accountsChanged', onAccountsChanged);
      } else if (typeof this.provider.removeListener === 'function') {
        this.provider.removeListener('connect', onConnect);
        this.provider.removeListener('disconnect', onDisconnect);
        this.provider.removeListener('chainChanged', onChainChanged);
        this.provider.removeListener('accountsChanged', onAccountsChanged);
      }
    };
  }

  /**
   * switch network
   *
   * See {@link SwitchEthereumChainParameter}
   *
   * @param chainId the if the the chain to switch to
   */
  protected async switchChain(chainId: number): Promise<void> {
    if (!this.provider) throw this.providerNotFoundError;

    await this.provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: toHexChainId(chainId) }],
    });
  }

  /**
   * Add a new network/chain to wallet
   *
   * @param see {@link AddEthereumChainParameter}
   */
  protected async addChain(
    addChainParameter: AddEthereumChainParameter,
  ): Promise<void> {
    if (!this.provider) throw this.providerNotFoundError;

    await this.provider.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          ...addChainParameter,
          chainId: toHexChainId(addChainParameter.chainId),
        },
      ],
    });
  }

  /**
   * fetch wallet accounts via the wallet provider
   *
   * @return the fetched accounts
   */
  protected async requestAccounts(): Promise<string[]> {
    if (!this.provider) throw this.providerNotFoundError;

    try {
      const accounts = await this.provider.request<string[]>({
        method: 'eth_requestAccounts',
      });
      return accounts;
    } catch (error: unknown) {
      console.debug(
        `Failed to request accounts with 'eth_requestAccounts', try to fallback to 'eth_accounts'`,
      );

      const accounts = await this.provider.request<string[]>({
        method: 'eth_accounts',
      });

      return accounts;
    }
  }

  /**
   * fetch wallet chainId via the wallet provider
   *
   * @return the fetched chainId
   */
  protected async requestChainId(): Promise<string> {
    if (!this.provider) throw this.providerNotFoundError;

    return await this.provider.request({ method: 'eth_chainId' });
  }
}
