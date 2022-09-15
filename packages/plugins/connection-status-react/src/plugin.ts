import type {
  CreatePlugin,
  MiddlewareContext,
  Middlewares,
  PluginContext,
  PluginName,
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

/**
 * Public plugin api
 */
export type Api = {
  hooks: {
    useConnectionStatus: () => ConnectionStatus;
  };
};

export type Options = {
  isPersist?: boolean;
  persistKey?: string;
};

export const create: CreatePlugin<Options, Api> = (options) => {
  const createApi = (_: PluginContext) => {
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

    const connect: Middlewares['connect'] =
      (_: MiddlewareContext) =>
      (next) =>
      async (...args) => {
        const result = await next(...args);

        store.setState({
          connectionStatus: ConnectionStatus.Connected,
        });

        return result;
      };

    const autoConnect: Middlewares['autoConnect'] =
      (_: MiddlewareContext) =>
      (next) =>
      async (...args) => {
        const result = await next(...args);

        store.setState({
          connectionStatus: ConnectionStatus.Connected,
        });

        return result;
      };

    const autoConnectOnce: Middlewares['autoConnectOnce'] =
      (_: MiddlewareContext) =>
      (next) =>
      async (...args) => {
        const result = await next(...args);

        store.setState({
          connectionStatus: ConnectionStatus.Connected,
        });

        return result;
      };

    const disconnect: Middlewares['disconnect'] =
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
      middlewares: {
        connect,
        autoConnect,
        autoConnectOnce,
        disconnect,
      },
      hooks: {
        useConnectionStatus,
      },
    };
  };

  return {
    name,
    createApi,
  };
};
