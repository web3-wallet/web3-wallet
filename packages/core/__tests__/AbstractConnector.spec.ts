/* eslint-disable jest/no-standalone-expect */
import type { Actions, State, Store, WalletName } from '../src';
import { AbstractConnector, createStore, DEFAULT_STATE } from '../src';
import mockData from './mockData.spec';
import { MockProvider } from './MockProvider.spec';

const chainId = mockData.hexChainIds[0];
const accounts = mockData.accounts.slice(0, 1);

class MockConnector extends AbstractConnector<MockProvider> {
  public provider?: MockProvider;
  public async detectProvider(): Promise<MockProvider> {
    if (this.provider) return this.provider;

    const provider = new MockProvider();
    provider.setChainId(chainId);
    provider.setAccounts(accounts);
    this.provider = provider;
    return provider;
  }
}

/*********************** Connector.detectProvider ****************************/
describe('detectProvider', () => {
  let connector: MockConnector;
  beforeEach(() => {
    const store = createStore();
    const walletName = 'MockConnector' as WalletName<'MockConnector'>;
    connector = new MockConnector(walletName, store.actions);
  });

  test('provider available after detectProvider resolve', async () => {
    expect(!!connector.provider).toBe(false);
    await connector.detectProvider();
    expect(!!connector.provider).toBe(true);
  });

  test('connectEagerly should be called internally by detectProvider', async () => {
    expect(!!connector.provider).toBe(false);
    await connector.connectEagerly();
    expect(!!connector.provider).toBe(true);
  });

  test('connectEagerly should be called internally by activate', async () => {
    expect(!!connector.provider).toBe(false);
    await connector.activate();
    expect(!!connector.provider).toBe(true);
  });
});

/*********************** Connector.connectEagerly ****************************/

describe('connectEagerly', () => {
  let store: Store;
  let actions: Actions;
  let connector: MockConnector;

  beforeEach(() => {
    const s = createStore();
    store = s.store;
    actions = s.actions;
    const walletName = 'MockConnector' as WalletName<'MockConnector'>;
    connector = new MockConnector(walletName, actions);
  });

  afterEach(() => {
    // connectEagerly should not call any of those methods
    expect(
      connector.provider?.wallet_switchEthereumChain.mock.calls,
    ).toHaveLength(0);
    expect(connector.provider?.wallet_addEthereumChain.mock.calls).toHaveLength(
      0,
    );
    expect(connector.provider?.wallet_watchAsset.mock.calls).toHaveLength(0);
  });

  test('success', async () => {
    await connector.connectEagerly();
    expect(connector.provider?.eth_chainId.mock.calls).toHaveLength(1);
    expect(connector.provider?.eth_requestAccounts.mock.calls).toHaveLength(1);
    expect(connector.provider?.eth_accounts.mock.calls).toHaveLength(0);

    expect(store.getState()).toEqual<State>({
      chainId: Number(chainId),
      accounts,
      isActivating: false,
    });
  });
  test('fail silently: case 1, unable to connect', async () => {
    await connector.detectProvider();

    // setChainId to undefined to mock `unable to connect`
    connector.provider?.setChainId(undefined);

    await connector.connectEagerly().catch(() => {});

    expect(connector.provider?.eth_chainId.mock.calls).toHaveLength(0);
    expect(connector.provider?.eth_requestAccounts.mock.calls).toHaveLength(0);
    expect(connector.provider?.eth_accounts.mock.calls).toHaveLength(0);

    expect(store.getState()).toEqual<State>(DEFAULT_STATE);
  });

  test('fail silently: case 2, accounts is undefined', async () => {
    await connector.detectProvider();

    connector.provider?.setAccounts(undefined);

    await connector.connectEagerly().catch(() => {});

    expect(connector.provider?.eth_chainId.mock.calls).toHaveLength(1);
    expect(connector.provider?.eth_requestAccounts.mock.calls).toHaveLength(1);
    expect(connector.provider?.eth_accounts.mock.calls).toHaveLength(0);

    expect(store.getState()).toEqual<State>(DEFAULT_STATE);
  });

  test('fail silently: case 3, accounts is empty', async () => {
    await connector.detectProvider();

    connector.provider?.setAccounts([]);

    await connector.connectEagerly().catch(() => {});

    expect(connector.provider?.eth_chainId.mock.calls).toHaveLength(1);
    expect(connector.provider?.eth_requestAccounts.mock.calls).toHaveLength(1);
    expect(connector.provider?.eth_accounts.mock.calls).toHaveLength(0);

    expect(store.getState()).toEqual<State>(DEFAULT_STATE);
  });

  /*********************** Connector.activate ****************************/
  /*********************** Connector.activate ****************************/
  /*********************** Connector.watchAsset ****************************/
  /*********************** Connector.deactivate ****************************/
});
