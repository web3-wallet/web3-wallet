import type { Provider, WalletName } from '@web3-wallet/core';
import { Connector } from '@web3-wallet/core';

import { icon } from './assets';

const providerFilter = (p: Provider) => !!p.isImToken;

const _name = 'imToken';
export const name = _name as WalletName<typeof _name>;

export class ImToken extends Connector {
  public static walletName: WalletName<string> = name;
  public static walletIcon: string = icon;
  public name: WalletName<string> = name;

  /** {@inheritdoc Connector.constructor} */
  constructor(options?: Connector['options']) {
    super({
      ...options,
      providerFilter,
    });
  }
}
