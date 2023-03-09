import type { WalletName } from '@web3-wallet/core';
import { Connector } from '@web3-wallet/core';

import { icon } from './assets';

const _walletName = 'DeFi Wallet';
const walletName = _walletName as WalletName<typeof _walletName>;

export class DeFiWallet extends Connector {
  public static walletName: WalletName<string> = walletName;
  public static walletIcon: string = icon;
  public walletName: WalletName<string> = walletName;

  /** {@inheritdoc Connector.constructor} */
  constructor(options?: Connector['options']) {
    super(options);
  }

  /** {@inheritdoc Connector.detectProvider} */
  public override async detectProvider() {
    if (typeof window === 'undefined') {
      throw this.providerNotFoundError;
    }

    if (window.navigator?.userAgent?.includes('DeFiWallet')) {
      return await super.detectProvider();
    }

    return await super.detectProvider(undefined, {
      eventName: 'deficonnectProvider#initialized',
      providerName: 'deficonnectProvider',
    });
  }
}
