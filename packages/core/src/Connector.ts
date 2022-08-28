import {
  type AddEthereumChainParameter,
  type ProviderConnectInfo,
  type ProviderRpcError,
  type WatchAssetParameters,
  AbstractConnector,
} from './types';
import { parseChainId, toHexChainId } from './utils';

export const isChainId = (
  chainIdOrChainParameter?: number | AddEthereumChainParameter,
): chainIdOrChainParameter is number => {
  return typeof chainIdOrChainParameter === 'number';
};

export const isAddChainParameter = (
  chainIdOrChainParameter?: number | AddEthereumChainParameter,
): chainIdOrChainParameter is AddEthereumChainParameter => {
  return !isChainId(chainIdOrChainParameter);
};

export abstract class Connector extends AbstractConnector {
  protected initialized = false;

  protected updateChainId(chainId: string | number): void {
    this.actions.update({
      chainId: parseChainId(chainId),
    });
  }

  protected updateAccounts(accounts: string[]): void {
    this.actions.update({ accounts });
  }

  protected onConnect({ chainId }: ProviderConnectInfo): void {
    this.updateChainId(chainId);
  }

  protected onDisconnect(error?: ProviderRpcError): void {
    this.resetState();
    error && this.onError?.(error);
  }

  protected onChainChanged(chainId: number | string): void {
    this.updateChainId(chainId);
  }

  protected onAccountsChanged(accounts: string[]): void {
    this.updateAccounts(accounts);
  }

  private addEventListeners(): void {
    if (!this.provider) throw this.providerNotFoundError;

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
  }

  protected async lazyInitialize(): Promise<void> {
    if (this.initialized) return;
    try {
      await this.detectProvider();
      this.addEventListeners();
    } finally {
      this.initialized = true;
    }
  }

  protected async switchChain(chainId: number): Promise<void> {
    if (!this.provider) throw this.providerNotFoundError;

    await this.provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: toHexChainId(chainId) }],
    });
  }

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

  protected async requestAccounts(): Promise<string[]> {
    if (!this.provider) throw this.providerNotFoundError;

    try {
      const accounts = await this.provider.request<string[]>({
        method: 'eth_requestAccounts',
      });
      return accounts;
    } catch (error: unknown) {
      console.warn(
        `Failed to request accounts with 'eth_requestAccounts'`,
        error,
      );

      const accounts = await this.provider.request<string[]>({
        method: 'eth_accounts',
      });

      return accounts;
    }
  }

  protected async requestChainId(): Promise<string> {
    if (!this.provider) throw this.providerNotFoundError;

    return await this.provider.request({ method: 'eth_chainId' });
  }

  public override async connectEagerly(): Promise<void> {
    const cancelActivation = this.actions.startActivation();

    try {
      await this.lazyInitialize();
      const [chainId, accounts] = await Promise.all([
        this.requestChainId(),
        this.requestAccounts(),
      ]);
      if (!accounts.length) throw new Error('No accounts returned');

      this.updateChainId(chainId);
      this.updateAccounts(accounts);
    } finally {
      cancelActivation();
    }
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
  public async activate(
    chainIdOrChainParameter?: number | AddEthereumChainParameter,
  ): Promise<void> {
    const cancelActivation = this.actions.startActivation();

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
        /**
         * can't handle the error, throw it again
         */
        if (!this.addChain || !shouldTryToAddChain) throw error;
        /**
         * if we're here, we can try to add a new network
         */
        await this.addChain(chainIdOrChainParameter);

        /**
         * chain added, activate the added chainId again
         */
        await this.activate(chainIdOrChainParameter.chainId);
      }
    } finally {
      cancelActivation();
    }
  }

  public async deactivate(): Promise<void> {
    this.resetState();
  }

  public async watchAsset({
    address,
    symbol,
    decimals,
    image,
  }: WatchAssetParameters): Promise<true> {
    if (!this.provider) throw this.providerNotFoundError;

    const success = await this.provider.request<boolean>({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address,
          symbol,
          decimals,
          image,
        },
      },
    });

    if (!success) throw new Error('Rejected');
    return true;
  }
}
