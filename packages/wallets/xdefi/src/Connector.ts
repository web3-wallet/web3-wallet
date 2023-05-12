import type { WalletName } from '@web3-wallet/core';
import { Connector } from '@web3-wallet/core';

const _walletName = 'XDEFI';
const walletName = _walletName as WalletName<typeof _walletName>;

export class XDEFI extends Connector {
  public static walletName: WalletName<string> = walletName;
  public static walletIcon = '';
  public walletName: WalletName<string> = walletName;

  /** {@inheritdoc Connector.constructor} */
  constructor(options?: Connector['options']) {
    super({
      detectProviderOptions: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        providerGetter: (window) => (window as any)?.xfi?.ethereum,
      },
      ...options,
    });
  }
}
