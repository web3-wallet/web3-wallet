import type { Actions, Provider } from '@web3-wallet/connector';
import { ProviderNoFoundError } from '@web3-wallet/connector';
import type { DeFiWalletEthereumProvider } from '@web3-wallet/defiwallet-detector';
import { EthereumConnector } from '@web3-wallet/ethereum-connector';

/**
 * @param onError - Handler to report errors thrown from eventListeners.
 */
export interface DeFiWalletConstructorArgs {
  actions: Actions;
  onError?: EthereumConnector['onError'];
}

const providerNotFoundError = new ProviderNoFoundError(
  'DeFi Wallet provider not found',
);

export class DeFiWallet extends EthereumConnector {
  public override provider?: Provider & DeFiWalletEthereumProvider;

  constructor({ actions, onError }: DeFiWalletConstructorArgs) {
    super(actions, onError);
  }

  public detectProvider = async () => {
    if (this.provider) this.provider;

    const m = await import('@web3-wallet/defiwallet-detector');

    const provider = await m.default();
    if (!provider) throw providerNotFoundError;

    this.provider = provider as Provider & DeFiWalletEthereumProvider;

    return this.provider;
  };

  public override deactivate = async (): Promise<void> => {
    this.resetState();
    await this.provider?.close?.();
  };
}
