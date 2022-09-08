import type {
  Connector,
  Provider,
  WalletName,
  WalletStoreActions,
} from '@web3-wallet/core';
import type { ProviderFilter } from '@web3-wallet/injected';
import { Injected } from '@web3-wallet/injected';

export type MobileProvider = Provider & {
  isTrust?: boolean;
};

export const walletName = 'DeFi Wallet' as WalletName<'DeFi Wallet'>;

const providerFilter: ProviderFilter<MobileProvider> = (p) =>
  !!p.isTrust && window.navigator?.userAgent?.includes('DeFiWallet');

export class DeFiWalletMobile extends Injected<MobileProvider> {
  /** {@inheritdoc Connector.constructor} */
  constructor({
    actions,
    onError,
  }: {
    actions: WalletStoreActions;
    onError?: Connector['onError'];
  }) {
    super(walletName, actions, {}, onError);
  }

  /** {@inheritdoc Connector.detectProvider} */
  public override async detectProvider() {
    return await super.detectProvider(providerFilter);
  }
}
