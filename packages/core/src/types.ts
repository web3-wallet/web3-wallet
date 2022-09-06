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
