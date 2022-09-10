import type {
  CreateVanillaPlugin,
  PluginName,
  VanillaWallet,
} from '@web3-wallet/vanilla';
import { persist as persistFn } from 'zustand/middleware';
import type { StoreApi } from 'zustand/vanilla';
import create from 'zustand/vanilla';

const defaultPersistKey = '@web3-wallet/plugin-connection-status';
export const pluginName = 'connectionStatus' as PluginName<'connectionStatus'>;

export enum ConnectionStatus {
  Untouched = 'Untouched',
  Connected = 'Connected',
  Disconnected = 'Disconnected',
}

export type ConnectionStatusState = {
  connectionStatus: ConnectionStatus;
};

const DEFAULT_STATE: ConnectionStatusState = {
  connectionStatus: ConnectionStatus.Untouched,
};

type VanillaConnectionStatusPluginApi = {
  store: StoreApi<ConnectionStatusState>;
};

export type VanillaConnectionStatusPluginOptions = {
  persist?: boolean;
  persistKey?: string;
};

export const createVanillaConnectionStatusPlugin: CreateVanillaPlugin<
  VanillaConnectionStatusPluginOptions,
  VanillaConnectionStatusPluginApi
> = (options) => (wallet) => {
  const { persist = false, persistKey = defaultPersistKey } = options || {};

  let store: StoreApi<ConnectionStatusState>;

  if (persist) {
    store = create<ConnectionStatusState>()(
      persistFn<ConnectionStatusState>(() => DEFAULT_STATE, {
        name: persistKey,
        version: 0,
      }),
    );
  } else {
    store = create<ConnectionStatusState>()(() => DEFAULT_STATE);
  }

  const connect: VanillaWallet['connect'] = async (...args) => {
    const result = await wallet.connect(...args);

    store.setState({
      connectionStatus: ConnectionStatus.Connected,
    });

    return result;
  };

  const autoConnect: VanillaWallet['autoConnect'] = async (...args) => {
    const result = await wallet.autoConnect(...args);

    store.setState({
      connectionStatus: ConnectionStatus.Connected,
    });

    return result;
  };

  const autoConnectOnce: VanillaWallet['autoConnectOnce'] = async (...args) => {
    const result = await wallet.autoConnectOnce(...args);

    store.setState({
      connectionStatus: ConnectionStatus.Connected,
    });

    return result;
  };

  const disconnect: VanillaWallet['disconnect'] = async (...args) => {
    const result = await wallet.disconnect(...args);

    store.setState({
      connectionStatus: ConnectionStatus.Disconnected,
    });

    return result;
  };

  return {
    name: pluginName,
    next: {
      connect,
      autoConnect,
      autoConnectOnce,
      disconnect,
    },
    api: {
      store,
    },
  };
};
