import type { Connector, WalletName } from '@web3-wallet/core';
import {
  type InjectedProvider,
  InjectedConnector,
} from '@web3-wallet/injected';

export type MetaMaskProvider = InjectedProvider & {
  isMetaMask?: boolean;
};

const walletName = 'MetaMask' as WalletName<'MetaMask'>;

const providerFilter = (p: MetaMaskProvider) => !!p.isMetaMask;

export class MetaMaskConnector extends InjectedConnector {
  constructor(actions: Connector['actions'], onError?: Connector['onError']) {
    super(walletName, actions, onError);
  }

  public override async detectProvider(): Promise<MetaMaskProvider> {
    return await super.detectProvider(providerFilter);
  }
}
