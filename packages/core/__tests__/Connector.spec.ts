import type { WalletName } from '../src';
import { AbstractConnector, createStore } from '../src';
import mockData from './mockData.spec';
import { MockProvider } from './MockProvider.spec';

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

test('it works', async () => {
  const mockConnector = new MockConnector(walletName, store.actions);
  const provider = await mockConnector.detectProvider();

  expect(!!provider).toBe(true);
});
