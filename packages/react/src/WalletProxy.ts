import type { Connector, WalletName } from '@web3-wallet/core';

import type { CacheOfAppliedPlugins } from './applyPlugins';
import { applyPlugins } from './applyPlugins';
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
  private cacheOfAppliedPlugins: CacheOfAppliedPlugins = new Map();
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
    if (!this.cacheOfAppliedPlugins.get(walletName)?.has(pluginName)) {
      throw new Error(`Can't find plugin '${pluginName}'`);
    }

    return this.cacheOfAppliedPlugins.get(walletName)?.get(pluginName) as T;
  }

  private createWallet(connector: Connector): void {
    if (this.hasWallet(connector.name)) {
      throw new Error(`Wallet '${connector.name}' already exits`);
    }

    const reactWallet = createWallet(connector);

    const wallet: Wallet = {
      ...reactWallet,
      getPlugin: <T extends PluginApi = PluginApi>(
        pluginName: PluginName,
      ): T => {
        return this.getPlugin<T>(wallet.name, pluginName);
      },
    };

    const nextWallet = applyPlugins(
      this.options?.plugins ?? [],
      wallet,
      this.cacheOfAppliedPlugins,
    );

    this.wallets.push(nextWallet);
  }
}
