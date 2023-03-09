import type { Provider, WalletName } from '@web3-wallet/core';
import { Connector } from '@web3-wallet/core';

import { icon } from './assets';

export type TrustWalletProvider = Provider & {
  isTrust?: boolean;
};
const providerFilter = (p: Provider) => !!p.isTrust;

const _walletName = 'Trust Wallet';
const walletName = _walletName as WalletName<typeof _walletName>;

export class TrustWallet extends Connector {
  public static walletName: WalletName<string> = walletName;
  public static walletIcon: string = icon;
  public walletName: WalletName<string> = walletName;

  /** {@inheritdoc Connector.constructor} */
  constructor(options?: Connector['options']) {
    super({
      providerFilter,
      ...options,
    });
  }
}
