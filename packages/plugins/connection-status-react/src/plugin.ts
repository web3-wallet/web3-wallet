import type {
  CreatePlugin,
  PluginName,
  WalletMiddleware,
} from '@web3-wallet/react';
import type { StoreApi, UseBoundStore } from 'zustand';
import createStore from 'zustand';
import { persist } from 'zustand/middleware';

const name = '@web3-wallet/plugin-connection-status-react';
export const pluginName = name as PluginName<typeof name>;

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

export const createPlugin: CreatePlugin<Options, Api> = (options) => () => {
  const { isPersist = false, persistKey = pluginName } = options || {};

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

  const connect: WalletMiddleware['connect'] =
    () =>
    (next) =>
    async (...args) => {
      const result = await next(...args);

      store.setState({
        connectionStatus: ConnectionStatus.Connected,
      });

      return result;
    };

  const autoConnect: WalletMiddleware['autoConnect'] =
    () =>
    (next) =>
    async (...args) => {
      const result = await next(...args);

      store.setState({
        connectionStatus: ConnectionStatus.Connected,
      });

      return result;
    };

  const autoConnectOnce: WalletMiddleware['autoConnectOnce'] =
    () =>
    (next) =>
    async (...args) => {
      const result = await next(...args);

      store.setState({
        connectionStatus: ConnectionStatus.Connected,
      });

      return result;
    };

  const disconnect: WalletMiddleware['disconnect'] =
    () =>
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
    name: pluginName,
    middleware: {
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
