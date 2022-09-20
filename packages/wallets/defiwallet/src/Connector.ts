import type { Provider, WalletName } from '@web3-wallet/core';
import { Connector } from '@web3-wallet/core';

export type DefiWalletProvider = Provider;

const _name = 'DeFi Wallet';
export const name = _name as WalletName<typeof _name>;

export class DeFiWallet extends Connector<DefiWalletProvider> {
  /** {@inheritdoc Connector.constructor} */
  constructor() {
    super(name);
  }

  /** {@inheritdoc Connector.detectProvider} */
  public override async detectProvider() {
    if (typeof window === 'undefined') {
      throw this.providerNotFoundError;
    }

    if (window.navigator?.userAgent?.includes('DeFiWallet')) {
      return await super.detectProvider();
    }

    return await super.detectProvider(undefined, {
      eventName: 'deficonnectProvider#initialized',
      providerName: 'deficonnectProvider',
    });
  }
}
