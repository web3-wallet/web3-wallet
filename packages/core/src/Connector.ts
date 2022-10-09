/* eslint-disable max-lines */
import type { DetectProviderOptions } from '@web3-wallet/detect-provider';

import { createWalletStoreAndActions } from './createWalletStore';
import type { WalletName, WalletStore, WalletStoreActions } from './types';
import { isAddChainParameter, ProviderNoFoundError } from './types';
import type {
  AddEthereumChainParameter,
  Provider,
  ProviderConnectInfo,
  ProviderRpcError,
  WatchAssetParameters,
} from './types/provider';
import { parseChainId, toHexChainId } from './utils';

export type ProviderFilter = (provider: Provider) => boolean;

/**
 * ProviderOptions is specific to each wallet provider, and it will be used to
 * to create/initialize the wallet provider instance.
 */
export type ProviderOptions = object | undefined;

export type BaseConnectorOptions = {
  detectProviderOptions?: DetectProviderOptions;
  providerFilter?: ProviderFilter;
};

/**
 * The wallet options object
 */
export type ConnectorOptions<
  TProviderOptions extends ProviderOptions = undefined,
> = TProviderOptions extends undefined
  ? BaseConnectorOptions
  : BaseConnectorOptions & {
      providerOptions: TProviderOptions;
    };

export abstract class Connector<
  TConnectorOptions extends ConnectorOptions = ConnectorOptions,
> {
  /**
   * {@link WalletName}
   */
  public abstract name: WalletName;

  /**
   * {@link Provider}
   **/
  public provider?: Provider;

  /**
   * The wallet options object, specific to each wallet
   */
  public options?: TConnectorOptions;

  /**
   * {@link WalletStore}
   */
  public store: WalletStore;

  /**
   * {@link WalletStoreActions}
   */
  protected actions: WalletStoreActions;

  /**
   *
   * ProviderNoFoundError should be thrown in the following cases
   *  1. detectProvider failed to retrieve the provider from a host environment.
   *  2. calling functions that requires a provider, but we have been unable to retrieve the provider
   */
  // protected providerNotFoundError: ProviderNoFoundError;
  protected get providerNotFoundError() {
    return new ProviderNoFoundError(`${this.name} provider not found`);
  }

  /**
   *
   * @param name - {@link Connector#WalletName}
   * @param actions - {@link WalletStoreActions}
   */
  constructor(options?: TConnectorOptions) {
    const { store, actions } = createWalletStoreAndActions();
    this.store = store;
    this.actions = actions;
    this.options = options;
  }

  /**
   * Detect provider in the host environment.
   *
   * @param providerFilter - providerFilter is provided the detected provider as it's input
   *  and providerFilter returns a boolean to indicated wether the detected provider can be used.
   *  1. detectProvider should throw the ProviderNoFoundError if providerFilter returns false
   *  2. detectProvider should throw the ProviderNoFoundError if providerFilter returns false
   *
   * detectProvider is internally called by {@link Connector#lazyInitialize}
   *
   * @return Promise<p> -
   *  1. resolve with the provider if the detection succeeded.
   *  2. reject with an ProviderNotFoundError if it failed to retrieve the provider from the host environment.
   */
  public async detectProvider(
    providerFilter?: ProviderFilter,
    options?: DetectProviderOptions,
  ): Promise<Provider> {
    if (this.provider) this.provider;

    const m = await import('@web3-wallet/detect-provider');

    const injectedProvider = (await m.detectProvider(
      options ?? this.options?.detectProviderOptions,
    )) as Provider;

    if (!injectedProvider) throw this.providerNotFoundError;

    let provider = injectedProvider as Provider | undefined;

    providerFilter =
      providerFilter ?? this.options?.providerFilter ?? (() => true);

    /**
     * handle the case when e.g. metamask and coinbase wallet are both installed
     * */
    if (injectedProvider.providers?.length) {
      provider = injectedProvider.providers?.find(providerFilter);
    } else {
      provider = provider && providerFilter(provider) ? provider : undefined;
    }

    if (!provider) {
      throw this.providerNotFoundError;
    }

    this.provider = provider;

    return provider;
  }

  /**
   * `lazyInitialize` does the following two things:
   *   1. triggers the provider detection process {@link Connector#detectProvider}
   *   2. Register event listeners to the provider {@link Connector#addEventListeners}
   *
   * `lazyInitialize` is internally called by the following public methods
   *   - {@link Connector#connect}
   *   - {@link Connector#autoConnect}
   *
   * @returns Promise<void>
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
   * @return Promise<boolean> -
   *  1. resolve with `true` if the connection succeeded.
   *  2. resolve with `false` if the connection failed.
   *
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

  /**
   * Initiates a connection.
   *
   * @param chain - If defined, indicates the desired chain to connect to. If the user is
   * already connected to this chain, no additional steps will be taken. Otherwise, the user will be prompted to switch
   * to the chain, if one of two conditions is met: either they already have it added in their extension, or the
   * argument is of type AddEthereumChainParameter, in which case the user will be prompted to add the chain with the
   * specified parameters first, before being prompted to switch.
   *
   * @returns Promise<void>
   */
  public async connect(
    chain?: number | AddEthereumChainParameter,
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
      const desiredChainId = typeof chain === 'number' ? chain : chain?.chainId;

      /**
       * there's no desired chain, or it's equal to the received chain
       */
      if (!desiredChainId || receivedChainId === desiredChainId) {
        this.updateChainId(receivedChainId);
        this.updateAccounts(accounts);
        /**
         * The connection process completed successfully, we can stop from here.
         */
        return;
      }

      /**
       * the desiredChainId does match the receivedChainId, try to switch chain
       */
      try {
        await this.switchChain(desiredChainId);
      } catch (err: unknown) {
        const error = err as ProviderRpcError;
        /**
         * switch chain failed, try to add chain
         */
        const shouldTryToAddChain = isAddChainParameter(chain);
        // const shouldTryToAddChain =
        //   isAddChainParameter(chain) &&
        //   (error.code === 4902 ||
        //     error.message.code === 4902 ||
        //     error.code === -32603);

        /**
         * don't know how to handle the error, throw the error again
         * and stop from here, the whole connection process failed.
         */
        if (!this.addChain || !shouldTryToAddChain) throw error;

        /**
         * try to add a new chain to wallet
         */
        await this.addChain(chain);

        /**
         * switch to the added chainId again
         */
        await this.switchChain(chain.chainId);
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
   *   - non-disconnect only reset the wallet store to it's initial state.
   *
   * For some wallets, MetaMask for example, there're not ways to force disconnect MetaMask.
   * For some wallets, Walletconnect for example, we are able to force disconnect Walletconnect.
   * @param _force - wether to force disconnect to wallet, default is false.
   *
   */
  public async disconnect(_force?: boolean): Promise<void> {
    this.actions.resetState();
  }

  /**
   * Add an asset to the wallet assets list
   *
   * @param asset - {@link WatchAssetParameters}
   * @return Promise<void>
   */
  public async watchAsset(asset: WatchAssetParameters): Promise<void> {
    if (!this.provider) throw this.providerNotFoundError;

    const success = await this.provider.request<boolean>({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: asset,
      },
    });

    if (!success) throw new Error(`Failed to watch ${asset.symbol}`);
  }

  /**
   * Update the wallet store with new the chainId
   *
   * @param chainId - the chainId to update
   * @return void
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
   * @return void
   */
  protected updateAccounts(accounts: string[]): void {
    this.actions.update({ accounts });
  }

  /**
   * wallet connect listener
   *
   * @param chainId - the connected chain id
   * @return void
   */
  protected onConnect({ chainId }: ProviderConnectInfo): void {
    this.updateChainId(chainId);
  }

  /**
   * Wallet disconnect listener
   *
   * @param error - the disconnect ProviderRpcError
   * @return void
   */
  protected onDisconnect(_: ProviderRpcError): void {
    this.actions.resetState();
  }

  /**
   * Wallet chainId change listener
   *
   * @param chainId - the new chainId
   * @return void
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
   * Remove event listeners
   *
   * Returned from addEventListeners {@link Connector#addEventListeners}
   *
   * don't need to remove event listeners if the provider never recreated in the whole lifecycle
   *
   * @returns void
   */
  protected removeEventListeners?: () => void;

  /**
   *  Register event listeners to the provider
   *
   * @return removeEventListeners -  a function to remove the registered event listeners {@link Connector#removeEventListeners}
   */
  protected addEventListeners(): Connector['removeEventListeners'] {
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
   * Switch network
   *
   * - {@link SwitchEthereumChainParameter}
   *
   * @param chainId - the if the the chain to switch to
   * @returns Promise<void>
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
   * @param - {@link AddEthereumChainParameter}
   * @returns Promise<void>
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
   * Fetch wallet accounts via the wallet provider
   *
   * @return Promise<string[]> - the fetched accounts
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
   * Fetch wallet chainId via the wallet provider
   *
   * @return Promise<string> - the fetched chainId
   */
  protected async requestChainId(): Promise<string> {
    if (!this.provider) throw this.providerNotFoundError;

    return await this.provider.request({ method: 'eth_chainId' });
  }
}
