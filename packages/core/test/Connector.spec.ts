/* eslint-disable jest/no-standalone-expect */
import type { WalletName, WalletState } from '../src';
import { Connector, DEFAULT_WALLET_STATE } from '../src';
import mockData from './mockData.spec';
import { MockProvider } from './MockProvider.spec';

const chainId = mockData.hexChainIds[0];
const accounts = mockData.accounts.slice(0, 1);

class MockConnector extends Connector {
  public name = 'Mock Wallet' as WalletName<'Mock Wallet'>;
  public icon = '';
  public override provider?: MockProvider;
  public override async detectProvider(): Promise<MockProvider> {
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
    connector = new MockConnector();
  });

  test('provider available after detectProvider resolve', async () => {
    expect(!!connector.provider).toBe(false);
    await connector.detectProvider();
    expect(!!connector.provider).toBe(true);
  });

  test('autoConnect should be called internally by detectProvider', async () => {
    expect(!!connector.provider).toBe(false);
    await connector.autoConnect();
    expect(!!connector.provider).toBe(true);
  });

  test('autoConnect should be called internally by connect', async () => {
    expect(!!connector.provider).toBe(false);
    await connector.connect();
    expect(!!connector.provider).toBe(true);
  });
});

/*********************** Connector.autoConnect ****************************/

describe('autoConnect', () => {
  let connector: MockConnector;

  beforeEach(() => {
    connector = new MockConnector();
  });

  afterEach(() => {
    // autoConnect should not call any of those methods
    expect(
      connector.provider?.wallet_switchEthereumChain.mock.calls,
    ).toHaveLength(0);
    expect(connector.provider?.wallet_addEthereumChain.mock.calls).toHaveLength(
      0,
    );
    expect(connector.provider?.wallet_watchAsset.mock.calls).toHaveLength(0);
  });

  test('success', async () => {
    await connector.autoConnect();
    expect(connector.provider?.eth_chainId.mock.calls).toHaveLength(1);
    expect(connector.provider?.eth_requestAccounts.mock.calls).toHaveLength(1);
    expect(connector.provider?.eth_accounts.mock.calls).toHaveLength(0);

    expect(connector.store.getState()).toEqual<WalletState>({
      chainId: Number(chainId),
      accounts,
      isConnecting: false,
    });
  });
  test('fail silently: case 1, unable to connect', async () => {
    await connector.detectProvider();

    // setChainId to undefined to mock `unable to connect`
    connector.provider?.setChainId(undefined);

    await connector.autoConnect().catch(() => {});

    expect(connector.provider?.eth_chainId.mock.calls).toHaveLength(0);
    expect(connector.provider?.eth_requestAccounts.mock.calls).toHaveLength(0);
    expect(connector.provider?.eth_accounts.mock.calls).toHaveLength(0);

    expect(connector.store.getState()).toEqual<WalletState>(
      DEFAULT_WALLET_STATE,
    );
  });

  test('fail silently: case 2, accounts is undefined', async () => {
    await connector.detectProvider();

    connector.provider?.setAccounts(undefined);

    await connector.autoConnect().catch(() => {});

    expect(connector.provider?.eth_chainId.mock.calls).toHaveLength(1);
    expect(connector.provider?.eth_requestAccounts.mock.calls).toHaveLength(1);
    expect(connector.provider?.eth_accounts.mock.calls).toHaveLength(0);

    expect(connector.store.getState()).toEqual<WalletState>(
      DEFAULT_WALLET_STATE,
    );
  });

  test('fail silently: case 3, accounts is empty', async () => {
    await connector.detectProvider();

    connector.provider?.setAccounts([]);

    await connector.autoConnect().catch(() => {});

    expect(connector.provider?.eth_chainId.mock.calls).toHaveLength(1);
    expect(connector.provider?.eth_requestAccounts.mock.calls).toHaveLength(1);
    expect(connector.provider?.eth_accounts.mock.calls).toHaveLength(0);

    expect(connector.store.getState()).toEqual<WalletState>(
      DEFAULT_WALLET_STATE,
    );
  });

  /*********************** Connector.connect ****************************/
  /*********************** Connector.connect ****************************/
  /*********************** Connector.watchAsset ****************************/
  /*********************** Connector.disconnect ****************************/
});
