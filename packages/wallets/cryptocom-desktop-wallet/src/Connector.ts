import type { WalletName } from '@web3-wallet/core';
import { Connector } from '@web3-wallet/core';

import { icon } from './assets';

const _name = 'Crypto.com DeFi Desktop Wallet';
export const name = _name as WalletName<typeof _name>;

export class CryptocomDesktopWallet extends Connector {
  public static walletName: WalletName<string> = name;
  public static walletIcon: string = icon;
  public name: WalletName<string> = name;
}
