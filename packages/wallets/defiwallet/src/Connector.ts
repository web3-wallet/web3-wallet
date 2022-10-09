import type { WalletName } from '@web3-wallet/core';
import { Connector } from '@web3-wallet/core';

import { icon } from './assets';

const _name = 'DeFi Wallet';
export const name = _name as WalletName<typeof _name>;

export class DeFiWallet extends Connector {
  public static walletName: WalletName<string> = name;
  public static walletIcon: string = icon;
  public name: WalletName<string> = name;

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
