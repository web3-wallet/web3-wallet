/* eslint-disable jest/no-export */
import { EventEmitter } from 'node:events';

import type { Provider, ProviderRpcError, RequestArguments } from '../src';

// Get around: "Your test suite must contain at least one test" error.
// eslint-disable-next-line jest/no-disabled-tests, jest/expect-expect
test.skip('skip', () => {});

export class MockProviderRpcError extends Error {
  public code: number;
  constructor(message = 'Mock Provider RPC Error') {
    super(message);
    this.code = 4200;
  }
}

export class MockProvider extends EventEmitter implements Provider {
  public chainId?: string;
  public accounts?: string[];
  public error?: MockProviderRpcError;

  public setChainId(chainId?: string) {
    this.chainId = chainId;
  }
  public setAccounts(accounts?: string[]) {
    this.accounts = accounts;
  }
  public setError(error?: MockProviderRpcError) {
    this.error = error;
  }

  public eth_chainId = jest.fn((chainId?: string) => chainId);
  public eth_accounts = jest.fn((accounts?: string[]) => accounts);
  public eth_requestAccounts = jest.fn((accounts?: string[]) => accounts);
  public wallet_switchEthereumChain = jest.fn(
    (params: RequestArguments['params']) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const param = (params as unknown as { chainId: string }[])[0]!;
      this.emitChainChanged(param.chainId);
    },
  );
  public wallet_addEthereumChain = jest.fn(
    (_params: RequestArguments['params']) => null,
  );
  public wallet_watchAsset = jest.fn((success: boolean) => success);

  public request<T>(x: RequestArguments): Promise<T> {
    if (!this.chainId) {
      return Promise.reject(new MockProviderRpcError('unable to connect'));
    }
    // reject if this.error exists
    if (this.error) return Promise.reject(this.error);

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
      case 'switch_addEthereumChain':
        return Promise.resolve(
          this.wallet_switchEthereumChain(x.params) as unknown as T,
        );
      case 'wallet_addEthereumChain':
        return Promise.resolve(
          this.wallet_addEthereumChain(x.params) as unknown as T,
        );
      case 'wallet_watchAsset':
        return Promise.resolve(this.wallet_watchAsset(true) as unknown as T);
      default:
        throw new MockProviderRpcError(`unknown method: ${x.method}`);
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
