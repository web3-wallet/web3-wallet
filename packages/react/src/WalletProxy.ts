import type { Connector, WalletName } from '@web3-wallet/core';

import {
  type CreateCurrentWalletOptions,
  createCurrentWallet,
} from './createCurrentWallet';
import { createWallet } from './createWallet';
import type { CurrentWallet, Plugin, Wallet } from './types';

export type WalletProxyOptions = {
  plugins?: Plugin[];
  currentWalletOptions?: CreateCurrentWalletOptions;
};

export class WalletProxy {
  private wallets: Wallet[] = [];
  private currentWallet: CurrentWallet;

  constructor(connectors: Connector[], options?: WalletProxyOptions) {
    if (!connectors.length) throw new Error(`connectors can't be empty`);

    connectors.forEach((connector) => {
      if (this.hasWallet(connector.name)) {
        throw new Error(`Duplicated Wallet '${connector.name}'`);
      }

      const wallet = createWallet(connector, options?.plugins);

      this.wallets.push(wallet);
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
}
