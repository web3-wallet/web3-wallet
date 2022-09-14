import type { Connector, WalletName } from '@web3-wallet/core';

import { applyWalletMiddleWares } from './applyWalletMiddlewares';
import {
  type CreateCurrentWalletOptions,
  createCurrentWallet,
} from './createCurrentWallet';
import { createWallet } from './createWallet';
import type { Plugin, PluginApi, PluginName } from './plugin';
import type { CurrentWallet, Wallet } from './types';

export type WalletProxyOptions = {
  plugins?: Plugin[];
  currentWalletOptions?: CreateCurrentWalletOptions;
};

export class WalletProxy {
  private pluginMap: Record<WalletName, Record<PluginName, PluginApi>> = {};
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

  public hasPlugin(walletName: WalletName, pluginName: PluginName): boolean {
    return !!this.pluginMap[walletName]?.[pluginName];
  }

  public hasWallet(name: WalletName): boolean {
    return this.wallets.some((w) => w.name === name);
  }

  public getWallet(name: WalletName): Wallet {
    if (!this.hasWallet(name)) {
      throw new Error(`Wallet ${name} don't exists`);
    }

    return this.wallets.find((w) => w.name === name) as Wallet;
  }

  public getWallets(): Wallet[] {
    return this.wallets.slice(0);
  }

  private getPlugin<T extends PluginApi = PluginApi>(
    walletName: WalletName,
    pluginName: PluginName,
  ): T {
    if (!this.hasPlugin(walletName, pluginName)) {
      throw new Error(`Can't find plugin '${pluginName}'`);
    }

    return this.pluginMap[walletName][pluginName] as T;
  }

  private createWallet(connector: Connector): void {
    if (this.hasWallet(connector.name)) {
      throw new Error(`Wallet '${connector.name}' already exits`);
    }

    const reactWallet = createWallet(connector);

    let wallet: Wallet = {
      ...reactWallet,
      getPlugin: <T extends PluginApi = PluginApi>(
        pluginName: PluginName,
      ): T => {
        return this.getPlugin<T>(wallet.name, pluginName);
      },
    };

    /**
     * Register plugins
     */
    this.options?.plugins?.forEach((plugin) => {
      wallet = this.applyPlugin(plugin, wallet);
    });

    this.wallets.push(wallet);
  }

  private applyPlugin(plugin: Plugin, wallet: Wallet): Wallet {
    /**
     * check and retrieve plugin dependencies
     */
    const dependencies: PluginApi[] = (plugin.dependencies ?? []).map(
      (dep: PluginName) => {
        if (this.hasPlugin(wallet.name, plugin.name)) {
          throw new Error(
            `Plugin dependency ${dep} don't exists: ${plugin.name} depends on ${dep} `,
          );
        }

        return this.pluginMap[wallet.name][dep];
      },
    );

    const pluginApi = plugin.createApi({ wallet, dependencies });

    this.pluginMap[wallet.name] = this.pluginMap[wallet.name] ?? {};
    this.pluginMap[wallet.name][plugin.name] = pluginApi;

    /**
     * Apply plugin middlewares
     */
    wallet = applyWalletMiddleWares(pluginApi.middlewares, wallet);

    return wallet;
  }
}
