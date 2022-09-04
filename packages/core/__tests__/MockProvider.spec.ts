/* eslint-disable jest/no-export */
import type {
  AddEthereumChainParameter,
  ProviderRpcError,
  RequestArguments,
  SwitchEthereumChainParameter,
} from '../src';
import { MockEIP1193Provider } from './MockEIP1193Provider.spec';

// Get around: "Your test suite must contain at least one test" error.
// eslint-disable-next-line jest/no-disabled-tests, jest/expect-expect
test.skip('skip', () => {});

type SwitchChainParam = Omit<SwitchEthereumChainParameter, 'chainId'> & {
  chainId: string;
};

type AddChainParam = Omit<AddEthereumChainParameter, 'chainId'> & {
  chainId: string;
};

export class MockProviderRpcError extends Error {
  public code: number;
  constructor() {
    super('Mock Provider RPC Error');
    this.code = 4200;
  }
}

export class MockProvider extends MockEIP1193Provider {
  public wallet_switchEthereumChain = jest.fn(
    (params: RequestArguments['params']) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const param = (params as unknown as SwitchChainParam[])[0]!;
      this.emit('chainChanged', param.chainId);
    },
  );

  public wallet_addEthereumChain = jest.fn(
    (params: RequestArguments['params']) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const param = (params as unknown as AddChainParam[])[0]!;
      this.emit('chainChanged', param.chainId);
    },
  );

  public wallet_watchAsset = jest.fn((success: boolean) => success);

  public wallet_switchEthereumChain_reject = jest.fn(
    (error: ProviderRpcError) => error,
  );

  public wallet_addEthereumChain_reject = jest.fn(
    (error: ProviderRpcError) => error,
  );

  public wallet_watchAsset_reject = jest.fn((error: ProviderRpcError) => error);

  public override request<T>(x: RequestArguments): Promise<T> {
    switch (x.method) {
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
        return super.request<T>(x);
    }
  }

  public override request_reject(
    x: RequestArguments,
    error: ProviderRpcError,
  ): Promise<unknown> {
    switch (x.method) {
      case 'switch_addEthereumChain':
        return Promise.reject(this.wallet_switchEthereumChain_reject(error));
      case 'wallet_addEthereumChain':
        return Promise.reject(this.wallet_addEthereumChain_reject(error));
      case 'wallet_watchAsset':
        return Promise.reject(this.wallet_watchAsset_reject(error));
      default:
        return super.request_reject(x, error);
    }
  }
}
