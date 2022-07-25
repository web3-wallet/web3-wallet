import type {
  Actions as BaseActions,
  Provider as BaseProvider,
  State as BaseState,
  Store as BaseStore,
} from '@web3-wallet/types';
import { Connector as BaseConnector } from '@web3-wallet/types';
import type { EventEmitter } from 'node:events';

export interface State extends BaseState {
  account?: string;
}

export type Store = BaseStore<State>;

export type Actions = BaseActions<State>;

export interface RequestArguments {
  readonly method: string;
  readonly params?: readonly unknown[] | object;
}

export interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

export interface Provider extends EventEmitter, BaseProvider {
  request<T>(args: RequestArguments): Promise<T>;
}

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

export class NoImplementedError extends Error {
  public constructor(message = 'Not implemented') {
    super(message);
    this.name = NoImplementedError.name;
    Object.setPrototypeOf(this, NoImplementedError.prototype);
  }
}
export abstract class Connector extends BaseConnector<Provider, State> {}
