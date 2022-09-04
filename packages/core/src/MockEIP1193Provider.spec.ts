import { EventEmitter } from 'node:events';

import type { Provider, ProviderRpcError, RequestArguments } from './types';

export class MockEIP1193ProviderRpcError extends Error {
  public code: number;
  constructor() {
    super('Mock EIP1193 Provider RPC Error');
    this.code = 4200;
  }
}

export class MockEIP1193Provider extends EventEmitter implements Provider {
  public chainId?: string;
  public accounts?: string[];

  public eth_chainId = jest.fn((chainId?: string) => chainId);
  public eth_accounts = jest.fn((accounts?: string[]) => accounts);
  public eth_requestAccounts = jest.fn((accounts?: string[]) => accounts);

  public eth_chainId_reject = jest.fn((error?: ProviderRpcError) => error);
  public eth_accounts_reject = jest.fn((error?: ProviderRpcError) => error);
  public eth_requestAccounts_reject = jest.fn(
    (error?: ProviderRpcError) => error,
  );

  public request<T>(x: RequestArguments): Promise<T> {
    // make sure to throw if we're "not connected"
    if (!this.chainId) return Promise.reject(new Error());

    switch (x.method) {
      case 'eth_chainId':
        return Promise.resolve(this.eth_chainId(this.chainId) as unknown as T);
      case 'eth_accounts':
        return Promise.resolve(
          this.eth_accounts(this.accounts) as unknown as T,
        );
      case 'eth_requestAccounts':
        return Promise.resolve(
          this.eth_requestAccounts(this.accounts) as unknown as T,
        );
      default:
        throw new Error();
    }
  }

  public request_reject(
    x: RequestArguments,
    error?: ProviderRpcError,
  ): Promise<unknown> {
    // make sure to throw if we're "not connected"
    if (!this.chainId) return Promise.reject(new Error());

    switch (x.method) {
      case 'eth_chainId':
        return Promise.reject(this.eth_chainId_reject(error));
      case 'eth_accounts':
        return Promise.reject(this.eth_accounts_reject(error));
      case 'eth_requestAccounts':
        return Promise.reject(this.eth_requestAccounts_reject(error));
      default:
        throw new Error();
    }
  }

  public emitConnect(chainId: string) {
    this.emit('connect', { chainId });
  }

  public emitDisconnect(error: ProviderRpcError) {
    this.emit('disconnect', error);
  }

  public emitChainChanged(chainId: string) {
    this.emit('chainChanged', chainId);
  }

  public emitAccountsChanged(accounts: string[]) {
    this.emit('accountsChanged', accounts);
  }
}
