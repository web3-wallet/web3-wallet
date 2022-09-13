import type { Connector, WalletName } from '@web3-wallet/core';

import { createCurrentWallet } from './createCurrentWallet';
import { createWallet as createReactWallet } from './createWallet';
import type { Plugin, PluginApi, PluginInfo, PluginName } from './plugin';
import type { CurrentWallet, Wallet } from './types';

export type WalletProxyOptions = {
  plugins?: Plugin[];
  currentWalletOptions?: {
    defaultCurrentWallet?: WalletName;
    key?: string;
  };
};

export class WalletProxy {
  private pluginApiMap: Record<WalletName, Record<PluginName, PluginInfo>> = {};
  private wallets: Wallet[] = [];
  private connectors: Connector[];
  private options?: WalletProxyOptions;
  private currentWallet: CurrentWallet;

  constructor(connectors: Connector[], options?: WalletProxyOptions) {
    if (!connectors.length) throw new Error(`connectors can't be empty`);
    this.options = options;
    this.connectors = connectors;
    this.connectors.forEach((connector) => {
      this.createWallet(connector);
    });

    this.currentWallet = createCurrentWallet(
      this.wallets,
      options?.currentWalletOptions,
    );
  }

  public getCurrentWallet(): CurrentWallet {
    return this.currentWallet;
  }

  public hasPlugin(walletName: WalletName, pluginName: PluginName) {
    return !!this.pluginApiMap[walletName]?.[pluginName];
  }

  public hasWallet(name: WalletName) {
    return this.wallets.some((w) => w.name === name);
  }

  public getWallet(name: WalletName): Wallet {
    if (!this.hasWallet(name)) {
      throw new Error(`Wallet ${name} don't exists`);
    }

    return this.wallets.find((w) => w.name === name) as Wallet;
  }

  public getWallets() {
    return this.wallets.slice(0);
  }

  private getPlugin<T extends PluginApi = PluginApi>(
    walletName: WalletName,
    pluginName: PluginName,
  ): PluginInfo<T> {
    if (!this.hasPlugin(walletName, pluginName)) {
      throw new Error(`Can't find plugin '${pluginName}'`);
    }

    return this.pluginApiMap[walletName][pluginName] as PluginInfo<T>;
  }

  private createWallet(connector: Connector): Wallet {
    if (this.hasWallet(connector.name)) {
      throw new Error(`Wallet '${connector.name}' already exits`);
    }

    const reactWallet = createReactWallet(connector);

    let wallet: Wallet = {
      ...reactWallet,
      getPlugin: <T extends PluginApi = PluginApi>(
        pluginName: PluginName,
      ): PluginInfo<T> => {
        return this.getPlugin<T>(reactWallet.name, pluginName);
      },
    };

    this.options?.plugins?.forEach((plugin) => {
      const pluginInfo = plugin(wallet);
      this.pluginApiMap[wallet.name] = this.pluginApiMap[wallet.name] ?? {};
      this.pluginApiMap[wallet.name][pluginInfo.name] = pluginInfo;

      const { middleware } = pluginInfo;

      /**
       * Apply middleware
       */
      if (middleware) {
        const { connect, autoConnect, autoConnectOnce, disconnect } =
          middleware;

        wallet = {
          ...wallet,
          connect: connect ? connect(wallet)(wallet.connect) : wallet.connect,
          autoConnect: autoConnect
            ? autoConnect(wallet)(wallet.autoConnect)
            : wallet.autoConnect,
          autoConnectOnce: autoConnectOnce
            ? autoConnectOnce(wallet)(wallet.autoConnectOnce)
            : wallet.autoConnectOnce,
          disconnect: disconnect
            ? disconnect(wallet)(wallet.disconnect)
            : wallet.disconnect,
        };
      }
    });

    this.wallets.push(wallet);

    return wallet;
  }
}
