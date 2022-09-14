import type {
  CreatePlugin,
  MiddlewareContext,
  PluginContext,
  PluginName,
  WalletMiddlewares,
} from '@web3-wallet/react';
import type { StoreApi, UseBoundStore } from 'zustand';
import createStore from 'zustand';
import { persist } from 'zustand/middleware';

const _name = '@web3-wallet/plugin-connection-status-react';
export const name = _name as PluginName<typeof _name>;

export enum ConnectionStatus {
  Untouched = 'Untouched',
  Connected = 'Connected',
  Disconnected = 'Disconnected',
}

export type State = {
  connectionStatus: ConnectionStatus;
};

const DEFAULT_STATE: State = {
  connectionStatus: ConnectionStatus.Untouched,
};

export type Api = {
  hooks: {
    useConnectionStatus: () => ConnectionStatus;
  };
};

export type Options = {
  isPersist?: boolean;
  persistKey?: string;
};

export const createPlugin: CreatePlugin<Options, Api> =
  (options) => (_: PluginContext) => {
    const { isPersist = false, persistKey = name } = options || {};

    let store: UseBoundStore<StoreApi<State>>;

    if (isPersist) {
      store = createStore<State>()(
        persist<State>(() => DEFAULT_STATE, {
          name: persistKey,
          version: 0,
        }),
      );
    } else {
      store = createStore<State>()(() => DEFAULT_STATE);
    }

    const connect: WalletMiddlewares['connect'] =
      (_: MiddlewareContext) =>
      (next) =>
      async (...args) => {
        const result = await next(...args);

        store.setState({
          connectionStatus: ConnectionStatus.Connected,
        });

        return result;
      };

    const autoConnect: WalletMiddlewares['autoConnect'] =
      (_: MiddlewareContext) =>
      (next) =>
      async (...args) => {
        const result = await next(...args);

        store.setState({
          connectionStatus: ConnectionStatus.Connected,
        });

        return result;
      };

    const autoConnectOnce: WalletMiddlewares['autoConnectOnce'] =
      (_: MiddlewareContext) =>
      (next) =>
      async (...args) => {
        const result = await next(...args);

        store.setState({
          connectionStatus: ConnectionStatus.Connected,
        });

        return result;
      };

    const disconnect: WalletMiddlewares['disconnect'] =
      (_: MiddlewareContext) =>
      (next) =>
      async (...args) => {
        const result = await next(...args);

        store.setState({
          connectionStatus: ConnectionStatus.Disconnected,
        });

        return result;
      };

    const useConnectionStatus: Api['hooks']['useConnectionStatus'] = () => {
      return store((s) => s.connectionStatus);
    };

    return {
      name,
      middlewares: {
        connect,
        autoConnect,
        autoConnectOnce,
        disconnect,
      },
      api: {
        hooks: {
          useConnectionStatus,
        },
      },
    };
  };
