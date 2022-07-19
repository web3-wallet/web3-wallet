import { createStore } from './createStore';
import { State } from './types';
import { MAX_SAFE_CHAIN_ID } from './utils';

describe('store', () => {
  test('store default state', () => {
    const { store } = createStore();
    expect(store.getState()).toEqual({
      chainId: undefined,
      accounts: undefined,
      isActivating: false,
    });
  });
});

describe('Activation', () => {
  test('startActivation', () => {
    const { store, actions } = createStore();
    actions.startActivation();
    expect(store.getState()).toEqual({
      chainId: undefined,
      accounts: undefined,
      isActivating: true,
    });
  });

  test('cancelActivation', () => {
    const { store, actions } = createStore();
    const cancelActivation = actions.startActivation();
    expect(store.getState()).toEqual<State>({
      chainId: undefined,
      accounts: undefined,
      isActivating: true,
    });
    cancelActivation();
    expect(store.getState()).toEqual<State>({
      chainId: undefined,
      accounts: undefined,
      isActivating: false,
    });
  });
});

describe('update chainId', () => {
  test('update with valid chainId', () => {
    const { store, actions } = createStore();
    let chainId = 1;
    actions.update({ chainId });
    expect(store.getState()).toEqual<State>({
      chainId,
      accounts: undefined,
      isActivating: false,
    });

    chainId = 100;
    actions.update({ chainId });
    expect(store.getState()).toEqual<State>({
      chainId,
      accounts: undefined,
      isActivating: false,
    });
  });

  test('update with invalid chainId', () => {
    const { actions } = createStore();
    let chainId = -1;
    expect(() => {
      actions.update({ chainId });
    }).toThrow();

    chainId = 0;
    expect(() => {
      actions.update({ chainId });
    }).toThrow();

    chainId = MAX_SAFE_CHAIN_ID + 1;
    expect(() => {
      actions.update({ chainId });
    }).toThrow();
  });
});

describe('update accounts', () => {
  test('update with valid accounts', () => {
    const { store, actions } = createStore();
    const accounts = [
      '0x0000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000001',
    ];
    actions.update({ accounts });
    expect(store.getState()).toEqual<State>({
      chainId: undefined,
      accounts,
      isActivating: false,
    });
  });

  test('update with invalid accounts', () => {
    const { actions } = createStore();
    let accounts = ['invalid account 1', 'invalid account 2'];
    expect(() => {
      actions.update({ accounts });
    }).toThrow();

    accounts = [
      '0x0000000000000000000000000000000000000000',
      'invalid account 1',
    ];

    expect(() => {
      actions.update({ accounts });
    }).toThrow();
  });
});

describe('update accounts & chainId', () => {
  test('valid accounts & valid chainId', () => {
    const { store, actions } = createStore();
    const chainId = 1;
    const accounts = ['0x0000000000000000000000000000000000000000'];
    actions.update({
      chainId,
      accounts,
    });
    expect(store.getState()).toEqual<State>({
      chainId,
      accounts,
      isActivating: false,
    });
  });

  test('valid chainId & invalid accounts', () => {
    const { actions } = createStore();
    const chainId = 1;
    const accounts = ['invalid account'];
    expect(() => {
      actions.update({
        chainId,
        accounts,
      });
    }).toThrow();
  });
  test('invalid chainId & valid accounts', () => {
    const { actions } = createStore();
    let chainId = -1;
    const accounts = ['0x0000000000000000000000000000000000000000'];
    expect(() => {
      actions.update({
        chainId,
        accounts,
      });
    }).toThrow();
    chainId = 0;
    expect(() => {
      actions.update({
        chainId,
        accounts,
      });
    }).toThrow();
    chainId = MAX_SAFE_CHAIN_ID + 1;
    expect(() => {
      actions.update({
        chainId,
        accounts,
      });
    }).toThrow();
  });
  test('invalid chainId & invalid accounts', () => {
    const { actions } = createStore();
    let chainId = -1;
    const accounts = ['invalid account 1'];
    expect(() => {
      actions.update({
        chainId,
        accounts,
      });
    }).toThrow();
    chainId = 0;
    expect(() => {
      actions.update({
        chainId,
        accounts,
      });
    }).toThrow();
    chainId = MAX_SAFE_CHAIN_ID + 1;
    expect(() => {
      actions.update({
        chainId,
        accounts,
      });
    }).toThrow();
  });
});

describe('resetState', () => {
  test('resetState works', () => {
    const { store, actions } = createStore();
    const stateUpdate = {
      chainId: 1,
      accounts: ['0x0000000000000000000000000000000000000000'],
    };
    actions.update(stateUpdate);
    const cancelActivation = actions.startActivation();
    expect(store.getState()).toEqual<State>({
      ...stateUpdate,
      isActivating: true,
    });
    cancelActivation();
    expect(store.getState()).toEqual<State>({
      ...stateUpdate,
      isActivating: false,
    });
    actions.resetState();
    expect(store.getState()).toEqual<State>({
      chainId: undefined,
      accounts: undefined,
      isActivating: false,
    });
  });
});
