import type { Networkish } from '@ethersproject/networks';
import type { BaseProvider as EthersBaseProvider } from '@ethersproject/providers';
import type {
  Actions as BaseActions,
  Hooks as BaseHooks,
  Provider as BaseProvider,
  State as BaseState,
  Store as BaseStore,
  Wallet as BaseWallet,
} from '@web3-wallet/types';
import { Connector as BaseConnector } from '@web3-wallet/types';
import type { EventEmitter } from 'node:events';

export interface State extends BaseState {
  chainId?: number;
}

export interface Hooks extends BaseHooks<State> {
  useAccount: () => string | undefined;
  useIsActive: () => boolean;
  useProvider: (
    network?: Networkish,
    enabled?: boolean,
  ) => EthersBaseProvider | undefined;
  useENSNames: (
    provider?: EthersBaseProvider,
  ) => undefined[] | (string | null)[];
  useENSName: (provider?: EthersBaseProvider) => undefined | string | null;
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
export type Wallet<T extends Connector = Connector> = BaseWallet<
  T,
  State,
  Hooks
>;
