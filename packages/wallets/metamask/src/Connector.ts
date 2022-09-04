import type {
  AbstractConnector,
  Provider,
  WalletName,
} from '@web3-wallet/core';
import { InjectedConnector } from '@web3-wallet/injected';

export type MetaMaskProvider = Provider & {
  isMetaMask?: boolean;
};

export const walletName = 'MetaMask' as WalletName<'MetaMask'>;
const providerFilter = (p: MetaMaskProvider) => !!p.isMetaMask;

export class MetaMaskConnector extends InjectedConnector<MetaMaskProvider> {
  constructor(
    actions: AbstractConnector['actions'],
    onError?: AbstractConnector['onError'],
  ) {
    super(walletName, actions, onError);
  }

  public override async detectProvider(): Promise<MetaMaskProvider> {
    return await super.detectProvider(providerFilter);
  }
}
