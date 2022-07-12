import type { Actions, Provider } from '@web3-wallet/connector';
import { Connector } from '@web3-wallet/connector';

/**
 * @param provider - An EIP-1193 ({@link https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md}) provider.
 * @param onError - Handler to report errors thrown from eventListeners.
 */
export interface EIP1193ConstructorArgs {
  actions: Actions;
  provider: Provider;
  onError?: (error: Error) => void;
}

export class EIP1193 extends Connector {
  /** {@inheritdoc Connector.provider} */
  public override provider: Provider;
  /**
   * add chain is not in the EIP1193 standard
   */
  public addChain = undefined;
  /**
   * switch chain is not in the EIP1193 standard
   */
  public switchChain = undefined;
  /**
   * watch asset is not in the EIP1193 standard
   */
  public watchAsset = undefined;

  public detectProvider = async () => {
    return this.provider;
  };

  constructor({ actions, provider, onError }: EIP1193ConstructorArgs) {
    super(actions, onError);

    this.provider = provider;
  }

  protected addEventListener(): void {
    this.provider.on('connect', this.onConnect);
    this.provider.on('disconnect', this.onDisconnect);
    this.provider.on('chainChanged', this.onChainIdChanged);
    this.provider.on('accountsChanged', this.onAccountsChanged);
  }

  protected removeEventListener(): void {
    this.provider.off('connect', this.onConnect);
    this.provider.off('disconnect', this.onDisconnect);
    this.provider.off('chainChanged', this.onChainIdChanged);
    this.provider.off('accountsChanged', this.onAccountsChanged);
  }

  protected requestAccounts = async (): Promise<string[]> => {
    return await this.provider.request<string[]>({ method: 'eth_accounts' });
  };

  protected requestChainId = async (): Promise<string> => {
    return await this.provider.request<string>({ method: 'eth_accounts' });
  };
}
