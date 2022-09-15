import type { Provider, WalletName } from '@web3-wallet/core';
import type { ProviderFilter } from '@web3-wallet/injected';
import { Injected } from '@web3-wallet/injected';

export type MobileProvider = Provider & {
  isTrust?: boolean;
};

const _name = 'Defi Wallet';
export const name = _name as WalletName<typeof _name>;

const providerFilter: ProviderFilter<MobileProvider> = (p) =>
  !!p.isTrust && window.navigator?.userAgent?.includes('DeFiWallet');

export class DeFiWalletMobile extends Injected<MobileProvider> {
  /** {@inheritdoc Connector.constructor} */
  constructor() {
    super(name);
  }

  /** {@inheritdoc Connector.detectProvider} */
  public override async detectProvider() {
    return await super.detectProvider(providerFilter);
  }
}
