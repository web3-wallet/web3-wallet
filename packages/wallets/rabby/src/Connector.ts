import type { WalletName } from '@react-web3-wallet/core';
import { Connector } from '@react-web3-wallet/core';

import { icon } from './assets';

const _walletName = 'Rabby';
const walletName = _walletName as WalletName<typeof _walletName>;

export class Rabby extends Connector {
  public static walletName: WalletName<string> = walletName;
  public static walletIcon: string = icon;
  public walletName: WalletName<string> = walletName;
  public override rdns = 'io.rabby';
}
