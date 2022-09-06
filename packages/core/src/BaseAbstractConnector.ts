import type {
  Actions,
  AddEthereumChainParameter,
  Provider,
  ProviderConnectInfo,
  ProviderRpcError,
  WalletName,
  WatchAssetParameters,
} from './types';
import { ProviderNoFoundError } from './types';

type RemoveEventListeners = () => void;

export abstract class BaseAbstractConnector<P extends Provider> {
  public name: WalletName;
  public abstract provider?: P;
  public actions: Actions;
  public onError?(error?: ProviderNoFoundError): Promise<void>;
  protected providerNotFoundError: ProviderNoFoundError;
  protected removeEventListeners?: RemoveEventListeners;

  constructor(
    name: WalletName,
    actions: Actions,
    onError?: (error: ProviderNoFoundError) => Promise<void>,
  ) {
    this.name = name;
    this.actions = actions;
    this.onError = onError;
    this.providerNotFoundError = new ProviderNoFoundError(
      `${name} provider not found`,
    );
  }

  public resetState(): void {
    this.actions.resetState();
  }
  public abstract detectProvider(
    providerFilter?: (provider: P) => boolean,
  ): Promise<P>;
  public abstract autoConnect(): Promise<void>;
  public abstract autoConnectOnce(): Promise<void>;
  public abstract connect(
    chainIdOrAddEthereumChainParameter?: number | AddEthereumChainParameter,
  ): Promise<void>;
  public abstract watchAsset(param: WatchAssetParameters): void;
  public abstract disconnect(): Promise<void>;

  protected abstract lazyInitialize(): Promise<void>;
  protected abstract addEventListeners(): RemoveEventListeners | undefined;
  protected abstract updateChainId(chainId: number): void;
  protected abstract updateAccounts(accounts: string[]): void;
  protected abstract switchChain(chainId: number): Promise<void>;
  protected abstract addChain(param: AddEthereumChainParameter): Promise<void>;
  protected abstract requestChainId(): Promise<string>;
  protected abstract requestAccounts(): Promise<string[]>;
  protected abstract onConnect(info: ProviderConnectInfo): void;
  protected abstract onDisconnect(error?: ProviderRpcError): void;
  protected abstract onChainChanged(chainId: number | string): void;
  protected abstract onAccountsChanged(accounts: string[]): void;
}
