import type { EventEmitter } from 'node:events';
import { StoreApi } from 'zustand/vanilla';

export interface State {
  chainId?: number;
  accounts?: string[];
  activating: boolean;
}

export type Store = StoreApi<State>;

export type StateUpdate =
  | {
      chainId: number;
      accounts: string[];
    }
  | {
      chainId: number;
      accounts?: never;
    }
  | {
      chainId?: never;
      accounts: string[];
    };

export interface Actions {
  startActivation: () => () => void;
  update: (stateUpdate: StateUpdate) => void;
  resetState: () => void;
}
// per EIP-1193
export interface RequestArguments {
  readonly method: string;
  readonly params?: readonly unknown[] | object;
}

// per EIP-1193
export interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

// per EIP-1193
export interface Provider extends EventEmitter {
  request<T>(args: RequestArguments): Promise<T>;
}

// per EIP-1193
export interface ProviderConnectInfo {
  readonly chainId: string;
}

export class ProviderNoFoundError extends Error {
  public constructor(message = 'Provider not found') {
    super(message);
    this.name = ProviderNoFoundError.name;
    Object.setPrototypeOf(this, ProviderNoFoundError.prototype);
  }
}

// per EIP-3085
export interface AddEthereumChainParameter {
  chainId: number;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string; // 2-6 characters long
    decimals: 18;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[]; // Currently ignored.
}

// per EIP-747
export interface WatchAssetParameters {
  address: string; // The address that the token is at.
  symbol: string; // A ticker symbol or shorthand, up to 5 chars.
  decimals: number; // The number of decimals in the token
  image: string; // A string url of the token logo
}

export type ProviderFilter = (provider: Provider) => boolean;

abstract class BaseAbstractConnector {
  /**
   * An
   * EIP-1193 ({@link https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md}) and
   * EIP-1102 ({@link https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1102.md}) compliant provider.
   * May also comply with EIP-3085 ({@link https://github.com/ethereum/EIPs/blob/master/EIPS/eip-3085.md}).
   * This property must be defined while the connector is active, unless a customProvider is provided.
   */
  public provider?: Provider;

  /**
   * Provider is usually loaded asynchronously. Connector consumers may want to known the provider load state.
   * This property is used to expose the provider load state to the Connector consumers.
   *
   * Resolve with the Provider if loaded successfully, and reject if failed to load the provider for any reason
   */
  public abstract detectProvider: (
    providerFilter?: ProviderFilter,
  ) => Promise<Provider>;

  /**
   * actions defined in store, which could be used to update the store state
   */
  protected actions: Actions;
  protected onError?: (error: ProviderRpcError) => void;

  constructor(actions: Actions, onError?: (error: ProviderRpcError) => void) {
    this.actions = actions;
    this.onError = onError;
  }

  /**
   * Reset state
   */
  public resetState = (): void => {
    this.actions.resetState();
  };

  /**
   * Initiate a connection.
   */
  public abstract activate(...args: unknown[]): Promise<void>;

  /**
   * Attempt to initiate a connection, failing silently
   */
  public connectEagerly?(...args: unknown[]): Promise<void>;

  /**
   * Un-initiate a connection. Only needs to be defined if a connection requires specific logic on disconnect.
   */
  public deactivate?(...args: unknown[]): Promise<void>;

  /**
   * Attempt to add an asset per EIP-747.
   */
  public watchAsset?(params: WatchAssetParameters): Promise<true>;
}

export abstract class AbstractConnector extends BaseAbstractConnector {
  protected abstract updateChainId(chainId: number | string): void;
  protected abstract updateAccounts(accounts: string[]): void;
  protected abstract lazyInitialize(): Promise<void>;
  protected abstract switchChain(chainId: number): Promise<void>;
  protected abstract addChain(
    addChainParameter: AddEthereumChainParameter,
  ): Promise<void>;
  protected abstract addEventListeners(): void;
  protected abstract removeEventListeners(): void;
  protected abstract requestChainId(): Promise<string>;
  protected abstract requestAccounts(): Promise<string[]>;
  protected abstract onConnect(info: ProviderConnectInfo): void;
  protected abstract onDisconnect(error?: ProviderRpcError): void;
  protected abstract onChainChanged(chainId: number | string): void;
  protected abstract onAccountsChanged(accounts: string[]): void;
}
