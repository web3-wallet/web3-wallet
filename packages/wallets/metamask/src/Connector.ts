import type { Connector, Provider, WalletName } from '@web3-wallet/core';
import { Injected } from '@web3-wallet/injected';

export type MetaMaskProvider = Provider & {
  isMetaMask?: boolean;
};

export const walletName = 'MetaMask' as WalletName<'MetaMask'>;
const providerFilter = (p: MetaMaskProvider) => !!p.isMetaMask;

export class MetaMask extends Injected<MetaMaskProvider> {
  /** {@inheritdoc Connector.constructor} */
  constructor({
    actions,
    onError,
  }: {
    actions: Connector['actions'];
    onError?: Connector['onError'];
  }) {
    super(walletName, actions, {}, onError);
  }

  /** {@inheritdoc Connector.detectProvider} */
  public override async detectProvider(): Promise<MetaMaskProvider> {
    return await super.detectProvider(providerFilter);
  }
}
