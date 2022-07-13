import { createStore } from '.';

describe('#createWeb3ReactStoreAndActions', () => {
  test('uninitialized', () => {
    const { store } = createStore();
    expect(store.getState()).toEqual({
      chainId: undefined,
      accounts: undefined,
      activating: false
    });
  });

  describe('#startActivation', () => {
    test('works', () => {
      const { store, actions } = createStore();
      actions.startActivation();
      expect(store.getState()).toEqual({
        chainId: undefined,
        accounts: undefined,
        activating: true,
      });
    });

    test('cancellation works', () => {
      const { store, actions } = createStore();
      const cancelActivation = actions.startActivation();

      cancelActivation();

      expect(store.getState()).toEqual({
        chainId: undefined,
        accounts: undefined,
        activating: false,
      });
    });
  });

  describe('#update', () => {
    test('throws on bad accounts', () => {
      const { actions } = createStore();
      expect(() =>
        actions.update({
          accounts: ['0x000000000000000000000000000000000000000'],
        }),
      ).toThrow();
    });

    test('chainId', () => {
      const { store, actions } = createStore();
      const chainId = 1;
      actions.update({ chainId });
      expect(store.getState()).toEqual({
        chainId,
        accounts: undefined,
        activating: false,
      });
    });

    describe('accounts', () => {
      test('empty', () => {
        const { store, actions } = createStore();
        const accounts: string[] = [];
        actions.update({ accounts });
        expect(store.getState()).toEqual({
          chainId: undefined,
          accounts,
          activating: false,
        });
      });

      test('single', () => {
        const { store, actions } = createStore();
        const accounts = ['0x0000000000000000000000000000000000000000'];
        actions.update({ accounts });
        expect(store.getState()).toEqual({
          chainId: undefined,
          accounts,
          activating: false,
        });
      });

      test('multiple', () => {
        const { store, actions } = createStore();
        const accounts = [
          '0x0000000000000000000000000000000000000000',
          '0x0000000000000000000000000000000000000001',
        ];
        actions.update({ accounts });
        expect(store.getState()).toEqual({
          chainId: undefined,
          accounts,
          activating: false,
        });
      });
    });

    test('both', () => {
      const { store, actions } = createStore();
      const chainId = 1;
      const accounts: string[] = [];
      actions.update({ chainId, accounts });
      expect(store.getState()).toEqual({
        chainId,
        accounts,
        activating: false,
      });
    });

    test('chainId does not unset activating', () => {
      const { store, actions } = createStore();
      const chainId = 1;
      actions.startActivation();
      actions.update({ chainId });
      expect(store.getState()).toEqual({
        chainId,
        accounts: undefined,
        activating: true,
      });
    });

    test('accounts does not unset activating', () => {
      const { store, actions } = createStore();
      const accounts: string[] = [];
      actions.startActivation();
      actions.update({ accounts });
      expect(store.getState()).toEqual({
        chainId: undefined,
        accounts,
        activating: true,
      });
    });

    test('unsets activating', () => {
      const { store, actions } = createStore();
      const chainId = 1;
      const accounts: string[] = [];
      actions.startActivation();
      actions.update({ chainId, accounts });
      expect(store.getState()).toEqual({
        chainId,
        accounts,
        activating: false,
      });
    });
  });
});
