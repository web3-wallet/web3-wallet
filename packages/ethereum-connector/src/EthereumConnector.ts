import {
  AddEthereumChainParameter,
  Connector,
  ProviderConnectInfo,
  ProviderNoFoundError,
  ProviderRpcError,
  WatchAssetParameters,
} from '@web3-wallet/connector';

import { isAddChainParameter, parseChainId } from './utils';

const providerNotFoundError = new ProviderNoFoundError();

export abstract class EthereumConnector extends Connector {
  protected initialized = false;

  protected updateChainId = (chainId: string | number): void => {
    this.actions.update({
      chainId: parseChainId(chainId),
    });
  };

  protected updateAccounts(accounts: string[]): void {
    this.actions.update({ accounts });
  }

  protected readonly lazyInitialize = async (): Promise<void> => {
    if (this.initialized) return;
    try {
      await this.detectProvider();
      this.addEventListeners();
    } finally {
      this.initialized = true;
    }
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

  protected addEventListeners(): void {
    if (!this.provider) throw providerNotFoundError;

    if (typeof this.provider.on === 'function') {
      this.provider.on('connect', this.onConnect);
      this.provider.on('disconnect', this.onDisconnect);
      this.provider.on('chainChanged', this.onChainChanged);
      this.provider.on('accountsChanged', this.onAccountsChanged);
    } else {
      this.provider.addListener('connect', this.onConnect);
      this.provider.addListener('disconnect', this.onDisconnect);
      this.provider.addListener('chainChanged', this.onChainChanged);
      this.provider.addListener('accountsChanged', this.onAccountsChanged);
    }
  }

  protected removeEventListeners(): void {
    if (!this.provider) throw providerNotFoundError;

    this.provider.removeListener('connect', this.onConnect);
    this.provider.removeListener('disconnect', this.onDisconnect);
    this.provider.removeListener('chainChanged', this.onChainChanged);
    this.provider.removeListener('accountsChanged', this.onAccountsChanged);
  }

  protected requestAccounts = async (): Promise<string[]> => {
    if (!this.provider) throw providerNotFoundError;

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
  };

  protected requestChainId = async (): Promise<string> => {
    if (!this.provider) throw providerNotFoundError;

    return await this.provider.request({ method: 'eth_chainId' });
  };

  protected onConnect = ({ chainId }: ProviderConnectInfo): void => {
    this.updateChainId(chainId);
  };

  protected onDisconnect = (error?: ProviderRpcError) => {
    this.actions.resetState();
    error && this.onError?.(error);
  };

  protected onChainChanged = (chainId: number | string): void => {
    this.updateChainId(chainId);
  };

  protected onAccountsChanged = (accounts: string[]): void => {
    this.updateAccounts(accounts);
  };

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

      if (!this.provider) throw providerNotFoundError;

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
        return this.actions.update({ chainId: receivedChainId, accounts });
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

  /** {@inheritdoc Connector.deactivate} */
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
