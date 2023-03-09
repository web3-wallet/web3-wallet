import type { Provider, WalletName } from '@web3-wallet/core';
import { Connector } from '@web3-wallet/core';

import { icon } from './assets';

const providerFilter = (p: Provider) => !!p.isImToken;

const _walletName = 'imToken';
const walletName = _walletName as WalletName<typeof _walletName>;

export class ImToken extends Connector {
  public static walletName: WalletName<string> = walletName;
  public static walletIcon: string = icon;
  public walletName: WalletName<string> = walletName;

  /** {@inheritdoc Connector.constructor} */
  constructor(options?: Connector['options']) {
    super({
      ...options,
      providerFilter,
    });
  }
}
