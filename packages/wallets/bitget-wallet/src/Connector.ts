import type { WalletName } from '@web3-wallet/core';
import { Connector } from '@web3-wallet/core';

import { icon } from './assets';

const _name = 'Bitget Wallet'
export const name = _name as WalletName<typeof _name>

export class BitgetWallet extends Connector {
  public static walletName: WalletName<string> = name
  public static walletIcon = icon
  public walletName: WalletName<string> = name

  constructor(options?: Connector['options']) {
    super({
      detectProviderOptions: {
        providerGetter: () => (window as any)?.bitkeep?.ethereum,
      },
      ...options,
    })
  }
}
