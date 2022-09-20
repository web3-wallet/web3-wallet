import {
  type WalletState,
  createWalletStoreAndActions,
  DEFAULT_WALLET_STATE,
} from '../src';
import mockData from './mockData.spec';

describe('store', () => {
  test('store default state', () => {
    const { store } = createWalletStoreAndActions();
    expect(store.getState()).toEqual({
      chainId: undefined,
      accounts: undefined,
      isConnecting: false,
    });
  });
});

describe('Activation', () => {
  test('startConnection', () => {
    const { store, actions } = createWalletStoreAndActions();
    actions.startConnection();
    expect(store.getState()).toEqual({
      chainId: undefined,
      accounts: undefined,
      isConnecting: true,
    });
  });

  test('cancelActivation', () => {
    const { store, actions } = createWalletStoreAndActions();
    const cancelActivation = actions.startConnection();
    expect(store.getState()).toEqual<WalletState>({
      chainId: undefined,
      accounts: undefined,
      isConnecting: true,
    });
    cancelActivation();
    expect(store.getState()).toEqual<WalletState>({
      chainId: undefined,
      accounts: undefined,
      isConnecting: false,
    });
  });
});

describe('update/valid chainId', () => {
  const { store, actions } = createWalletStoreAndActions();
  const table = mockData.chainIds.map((v) => [v]);
  test.each(table)('chainId: %i', (chainId: number) => {
    actions.update({
      chainId,
    });
    expect(store.getState()).toEqual<WalletState>({
      chainId,
      accounts: undefined,
      isConnecting: false,
    });
  });
});
describe('update/invalid chainId', () => {
  const { store, actions } = createWalletStoreAndActions();
  const table = mockData.invalidChainIds.map((v) => [v]);
  test.each(table)('chainId: %i', (chainId: number) => {
    actions.update({
      chainId,
    });
    expect(store.getState()).toEqual(DEFAULT_WALLET_STATE);
  });
});

describe('update/valid accounts', () => {
  test('valid accounts', () => {
    const { store, actions } = createWalletStoreAndActions();
    const accounts = [...mockData.accounts];
    actions.update({ accounts });
    expect(store.getState()).toEqual<WalletState>({
      chainId: undefined,
      accounts,
      isConnecting: false,
    });
  });
});
describe('update/invalid accounts', () => {
  const { store, actions } = createWalletStoreAndActions();
  const table = mockData.invalidChainIds.map((v) => [v]);
  test.each(table)('chainId: %i', (chainId: number) => {
    actions.update({
      chainId,
    });
    expect(store.getState()).toEqual(DEFAULT_WALLET_STATE);
  });
});

describe('update/accounts & chainId', () => {
  test('valid accounts & valid chainId', () => {
    const { store, actions } = createWalletStoreAndActions();
    const chainId = mockData.chainIds[0];
    const accounts = [...mockData.accounts];
    actions.update({
      chainId,
      accounts,
    });
    expect(store.getState()).toEqual<WalletState>({
      chainId,
      accounts,
      isConnecting: false,
    });
  });

  test('valid chainId & invalid accounts', () => {
    const { store, actions } = createWalletStoreAndActions();
    const chainId = mockData.chainIds[0];
    const accounts = [...mockData.invalidAccounts];
    actions.update({
      chainId,
      accounts,
    });
    expect(store.getState()).toEqual(DEFAULT_WALLET_STATE);
  });
  test('invalid chainId & invalid accounts', () => {
    const { store, actions } = createWalletStoreAndActions();
    const chainId = mockData.invalidChainIds[0];
    const accounts = [...mockData.invalidAccounts];
    actions.update({
      chainId,
      accounts,
    });
    expect(store.getState()).toEqual(DEFAULT_WALLET_STATE);
  });
});

describe('resetState', () => {
  test('resetState works', () => {
    const { store, actions } = createWalletStoreAndActions();
    const stateUpdate = {
      chainId: mockData.chainIds[0],
      accounts: [...mockData.accounts],
    };
    actions.update(stateUpdate);
    const cancelActivation = actions.startConnection();
    expect(store.getState()).toEqual<WalletState>({
      ...stateUpdate,
      isConnecting: true,
    });
    cancelActivation();
    expect(store.getState()).toEqual<WalletState>({
      ...stateUpdate,
      isConnecting: false,
    });
  });
});
