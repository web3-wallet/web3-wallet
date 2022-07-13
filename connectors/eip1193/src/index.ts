import type { Actions, Provider } from '@web3-wallet/connector';
import { EthereumConnector } from '@web3-wallet/ethereum-connector';

/**
 * @param provider - An EIP-1193 ({@link https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md}) provider.
 * @param onError - Handler to report errors thrown from eventListeners.
 */
export interface EIP1193ConstructorArgs {
  actions: Actions;
  provider: Provider;
  onError?: (error: Error) => void;
}

export class EIP1193 extends EthereumConnector {
  public override provider: Provider;

  public detectProvider = async () => {
    return this.provider;
  };

  constructor({ actions, provider, onError }: EIP1193ConstructorArgs) {
    super(actions, onError);
    this.provider = provider;
  }

  public override activate = async (): Promise<void> => {
    const cancelActivation = this.actions.startActivation();

    try {
      await this.lazyInitialize();

      const [chainId, accounts] = await Promise.all([
        this.requestChainId(),
        this.requestAccounts(),
      ]);

      this.updateChainId(chainId);
      this.updateAccounts(accounts);
    } finally {
      cancelActivation();
    }
  };
}
