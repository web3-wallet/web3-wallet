import { AbstractConnector } from './Connector';
import mockData from './mockData';
import { MockProvider } from './MockProvider.spec';
import { createStore } from './store';
import type { WalletName } from './types';

class MockConnector extends AbstractConnector<MockProvider> {
  public provider?: MockProvider;
  public async detectProvider(): Promise<MockProvider> {
    const mockProvider = new MockProvider();
    mockProvider.chainId = mockData.hexChainIds[0];
    this.provider = mockProvider;

    return mockProvider;
  }
}

const store = createStore();
const walletName = 'MockConnector' as WalletName<'MockConnector'>;

const mockConnector = new MockConnector(walletName, store.actions);
