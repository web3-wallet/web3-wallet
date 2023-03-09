import type { WalletName } from '@web3-wallet/core';
import { Connector } from '@web3-wallet/core';

import { icon } from './assets';

const _walletName = 'Brave Wallet';
const walletName = _walletName as WalletName<typeof _walletName>;

export class BraveWallet extends Connector {
  public static walletName: WalletName<string> = walletName;
  public static walletIcon: string = icon;
  public walletName: WalletName<string> = walletName;
}
