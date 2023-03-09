import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Connector } from './Connector';
import type {
  CurrentWallet,
  CurrentWalletState,
  CurrentWalletStore,
  Wallet,
  WalletName,
} from './types';
import { WalletConnectionStatus } from './types';

export const isWallet = <TWallet extends Pick<Wallet, 'getConnector'>>(
  connectorOrWallet: Connector | TWallet,
): connectorOrWallet is TWallet =>
  typeof (connectorOrWallet as TWallet).getConnector === 'function';

export type CreateCurrentWalletOptions = {
  defaultCurrentWallet?: WalletName;
  persistKey?: string;
};

export const createCurrentWallet = (
  connectorsOrWallets: (Connector | Wallet)[],
  options?: CreateCurrentWalletOptions,
): CurrentWallet => {
  const { defaultCurrentWallet, persistKey = '@web3-wallet/current-wallet' } =
    options ?? {};

  const connectors: Connector[] = connectorsOrWallets.map((v) =>
    isWallet(v) ? v.getConnector() : v,
  );

  const getConnector = (walletName: WalletName): Connector => {
    return connectors.find((v) => v.walletName === walletName) as Connector;
  };

  const currentWalletName: WalletName =
    defaultCurrentWallet || connectors[0].walletName;

  const DEFAULT_STATE: CurrentWalletState = {
    connectionStatus: WalletConnectionStatus.Untouched,
    walletName: currentWalletName,
    ...getConnector(currentWalletName).store.getState(),
  };

  const store: CurrentWalletStore = create<CurrentWalletState>()(
    persist<CurrentWalletState>(() => DEFAULT_STATE, {
      name: persistKey,
      version: 0,
      partialize: ({ walletName, connectionStatus }) => ({
        isConnecting: false,
        chainId: undefined,
        accounts: [],
        walletName,
        connectionStatus,
      }),
    }),
  );

  const getCurrentConnector = (): Connector => {
    const walletName = store.getState().walletName;
    const connector = getConnector(walletName);

    if (connector) return connector;

    console.debug(
      `Wallet ${walletName}, don't exist, reset current wallet to ${connectors[0].walletName}`,
    );

    store.setState({
      walletName: connectors[0].walletName,
      connectionStatus: WalletConnectionStatus.Untouched,
    });

    return connectors[0];
  };

  let unsubscribe: () => void;
  const switchCurrentWallet = (walletName: WalletName) => {
    if (getConnector(walletName)) {
      store.setState({
        walletName,
        ...getConnector(walletName).store.getState(),
      });

      unsubscribe?.();

      unsubscribe = getConnector(walletName).store.subscribe((state) => {
        // copy the wallet store state to current wallet store
        store.setState({
          ...state,
        });
      });
    } else {
      console.debug(`Wallet '${walletName}' don't exists`);
    }
  };

  // update current wallet store
  switchCurrentWallet(store.getState().walletName);

  const getConnect: (walletName?: WalletName) => Connector['connect'] =
    (walletName) =>
    async (...args) => {
      const connector = walletName
        ? getConnector(walletName)
        : getCurrentConnector();

      const result = await connector.connect(...args);

      store.setState({
        walletName: connector.walletName,
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
      walletName: connector.walletName,
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

  return {
    getWalletName: () => getCurrentConnector().walletName,
    getStore: () => store,
    getConnector: getCurrentConnector,
    connect: getConnect(),
    autoConnect,
    disconnect,
    watchAsset: (...args) => getCurrentConnector().watchAsset(...args),
    detectProvider: () => getCurrentConnector().detectProvider(),
    // current wallet only apis
    switchCurrentWallet,
    connectAsCurrentWallet: (walletName, ...args) => {
      switchCurrentWallet(walletName);
      return getConnect(walletName)(...args);
    },
  };
};
