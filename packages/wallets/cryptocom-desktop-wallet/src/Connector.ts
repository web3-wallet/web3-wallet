import type { Provider, WalletName } from '@web3-wallet/core';
import { Connector } from '@web3-wallet/core';

import { icon } from './assets';

const _name = 'Crypto.com DeFi Desktop Wallet';
export const name = _name as WalletName<typeof _name>;

const providerFilter = (p: Provider) => {
  return !!p.isDesktopWallet;
};

export class CryptocomDesktopWallet extends Connector {
  public static walletName: WalletName<string> = name;
  public static walletIcon: string = icon;
  public name: WalletName<string> = name;
  public icon: string = icon;

  /** {@inheritdoc Connector.constructor} */
  constructor(options?: Connector['options']) {
    super({
      providerFilter,
      ...options,
    });
  }
}
