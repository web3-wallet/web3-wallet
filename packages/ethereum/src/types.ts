import type {
  Actions as BaseActions,
  Provider as BaseProvider,
  ProviderFilter as BaseProviderFilter,
  State as BaseState,
  Store as BaseStore,
} from '@web3-wallet/types';
import { Connector as BaseConnector } from '@web3-wallet/types';
import type { EventEmitter } from 'node:events';

export interface State extends BaseState {
  chainId?: number;
}

export type Store = BaseStore<State>;

export type Actions = BaseActions<State>;

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
export interface Provider extends EventEmitter, BaseProvider {
  request<T>(args: RequestArguments): Promise<T>;
}

// per EIP-1193
export interface ProviderConnectInfo {
  readonly chainId: string;
}

export type ProviderFilter<T extends Provider> = BaseProviderFilter<T>;

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

export abstract class Connector extends BaseConnector<Provider, State> {}
