import { persist } from 'zustand/middleware';
import create from 'zustand/vanilla';

import type { Connector } from './Connector';
import type {
  CurrentWallet,
  CurrentWalletState,
  CurrentWalletStore,
  Plugin,
  PluginApiMap,
  PluginName,
  Wallet,
  WalletName,
} from './types';
import { WalletConnectionStatus } from './types';

const isWallet = <TWallet extends Pick<Wallet, 'getConnector'>>(
  connectorOrWallet: Connector | TWallet,
): connectorOrWallet is TWallet =>
  typeof (connectorOrWallet as TWallet).getConnector === 'function';

export type CreateCurrentWalletOptions = {
  defaultCurrentWallet?: WalletName;
  persistKey?: string;
  plugins?: Plugin[];
};

export const createCurrentWallet = (
  connectorsOrWallets: (Connector | Wallet)[],
  options?: CreateCurrentWalletOptions,
): CurrentWallet => {
  const {
    plugins,
    defaultCurrentWallet,
    persistKey = '@web3-wallet/current-wallet',
  } = options ?? {};

  const connectors: Connector[] = connectorsOrWallets.map((v) =>
    isWallet(v) ? v.getConnector() : v,
  );

  const getConnector = (name: WalletName): Connector => {
    return connectors.find((v) => v.name === name) as Connector;
  };

  const currentWalletName: WalletName =
    defaultCurrentWallet || connectors[0].name;

  const DEFAULT_STATE: CurrentWalletState = {
    connectionStatus: WalletConnectionStatus.Untouched,
    name: currentWalletName,
    ...getConnector(currentWalletName).store.getState(),
  };

  const store: CurrentWalletStore = create<CurrentWalletState>()(
    persist<CurrentWalletState>(() => DEFAULT_STATE, {
      name: persistKey,
      version: 0,
      partialize: ({ name, connectionStatus }) =>
        ({
          name,
          connectionStatus,
        } as unknown as CurrentWalletState),
    }),
  );

  const getCurrentConnector = (): Connector => {
    const name = store.getState().name;
    const connector = getConnector(name);

    if (connector) return connector;

    console.debug(
      `Wallet ${name}, don't exist, reset current wallet to ${connectors[0].name}`,
    );

    store.setState({
      name: connectors[0].name,
      connectionStatus: WalletConnectionStatus.Untouched,
    });

    return connectors[0];
  };

  let unsubscribe: () => void;
  const switchCurrentWallet = (name: WalletName) => {
    if (getConnector(name)) {
      store.setState({
        name,
        ...getConnector(name).store.getState(),
      });

      unsubscribe?.();

      unsubscribe = getConnector(name).store.subscribe((state) => {
        store.setState({
          ...state,
        });
      });
    } else {
      console.debug(`Wallet '${name}' don't exists`);
    }
  };

  switchCurrentWallet(store.getState().name);

  const getConnect: (walletName?: WalletName) => Connector['connect'] =
    (walletName) =>
    async (...args) => {
      const connector = walletName
        ? getConnector(walletName)
        : getCurrentConnector();

      const result = await connector.connect(...args);

      store.setState({
        name: connector.name,
        connectionStatus: WalletConnectionStatus.Connected,
      });

      return result;
    };

  const autoConnect: Connector['autoConnect'] = async (...args) => {
    const connector = getCurrentConnector();

    if (
      store.getState().connectionStatus === WalletConnectionStatus.Disconnected
    ) {
      return false;
    }

    const result = await connector.autoConnect(...args);

    store.setState({
      name: connector.name,
      connectionStatus: WalletConnectionStatus.Connected,
    });

    return result;
  };

  const disconnect: Connector['disconnect'] = async (...args) => {
    const connector = getCurrentConnector();
    const result = await connector.disconnect(...args);
    store.setState({
      connectionStatus: WalletConnectionStatus.Disconnected,
    });
    return result;
  };

  const pluginApiMap: PluginApiMap = new Map();

  return {
    getName: () => getCurrentConnector().name,
    getStore: () => store,
    getConnector: getCurrentConnector,
    connect: getConnect(),
    autoConnect,
    disconnect,
    watchAsset: (...args) => getCurrentConnector().watchAsset(...args),
    detectProvider: () => getCurrentConnector().detectProvider(),
    getPlugins: () => plugins ?? [],
    pluginApiMap,
    getPluginApi: <TPluginApi = unknown>(
      pluginName: PluginName,
    ): TPluginApi => {
      if (!pluginApiMap.has(pluginName)) {
        throw new Error(`Plugin ${pluginName} don't exists!`);
      }
      return pluginApiMap.get(pluginName) as TPluginApi;
    },

    // current wallet only apis
    switchCurrentWallet,
    connectAsCurrentWallet: (name, ...args) => {
      switchCurrentWallet(name);
      return getConnect(name)(...args);
    },
  };
};
