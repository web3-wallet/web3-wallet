import type { EventEmitter } from 'node:events';
import type { StoreApi } from 'zustand/vanilla';

export interface State {
  isConnecting: boolean;
  chainId?: number;
  accounts?: string[];
}

export type Store = StoreApi<State>;

export interface Actions {
  startConnection: () => () => void;
  resetState: () => void;
  update: (stateUpdate: Partial<Omit<State, 'isConnecting'>>) => void;
}

// https://eips.ethereum.org/EIPS/eip-1193
export interface RequestArguments {
  readonly method: string;
  readonly params?: readonly unknown[] | object;
}

// https://eips.ethereum.org/EIPS/eip-1193
export interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

// https://eips.ethereum.org/EIPS/eip-1193
export interface Provider extends EventEmitter {
  request<T>(args: RequestArguments): Promise<T>;
}

// per EIP-1193
export interface ProviderConnectInfo {
  isConnecting: boolean;
  chainId: string;
  accounts?: string[];
}

export class ProviderNoFoundError extends Error {
  public constructor(message = 'Provider not found') {
    super(message);
    this.name = ProviderNoFoundError.name;
    Object.setPrototypeOf(this, ProviderNoFoundError.prototype);
  }
}

// https://docs.metamask.io/guide/rpc-api.html#unrestricted-methods
// https://ethereum-magicians.org/t/eip-3326-wallet-switchethereumchain/5471
export interface SwitchEthereumChainParameter {
  chainId: number;
}

// https://eips.ethereum.org/EIPS/eip-3085
export interface AddEthereumChainParameter {
  chainId: number;
  chainName: string;
  nativeCurrency: {
    name: string;
    // 2-6 characters
    symbol: string;
    decimals: 18;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  // Currently ignored.
  iconUrls?: string[];
}

// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-747.md
// https://docs.metamask.io/guide/rpc-api.html#wallet-watchasset
export interface WatchAssetParameters {
  // The address that the token is at.
  address: string;
  // A ticker symbol or shorthand, up to 5 chars.
  symbol: string;
  // The number of decimals in the token
  decimals: number;
  // A string url of the token logo
  image: string;
}

export type Brand<K, T> = K & { __brand__: T };
export type WalletName<T extends string = string> = Brand<T, 'WalletName'>;

type RemoveEventListeners = () => void;

export abstract class BaseAbstractConnector<P extends Provider> {
  public name: WalletName;
  public abstract provider?: P;
  public actions: Actions;
  public onError?(...args: unknown[]): Promise<void>;
  protected providerNotFoundError: ProviderNoFoundError;
  protected removeEventListeners?: RemoveEventListeners;

  constructor(
    name: WalletName,
    actions: Actions,
    onError?: (...args: unknown[]) => Promise<void>,
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
