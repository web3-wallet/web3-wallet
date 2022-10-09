import type { Provider, WalletName } from '@web3-wallet/core';
import { Connector } from '@web3-wallet/core';

import { icon } from './assets';

export type TrustWalletProvider = Provider & {
  isTrust?: boolean;
};
const providerFilter = (p: Provider) => !!p.isTrust;

const _name = 'Trust Wallet';
export const name = _name as WalletName<typeof _name>;

export class TrustWallet extends Connector {
  public static walletName: WalletName<string> = name;
  public static walletIcon: string = icon;
  public name: WalletName<string> = name;

  /** {@inheritdoc Connector.constructor} */
  constructor(options?: Connector['options']) {
    super({
      providerFilter,
      ...options,
    });
  }
}
