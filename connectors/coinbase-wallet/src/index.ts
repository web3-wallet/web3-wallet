import type {
  CoinbaseWalletProvider,
  CoinbaseWalletSDK,
} from '@coinbase/wallet-sdk';
import { Actions } from '@web3-wallet/connector';
import { EthereumConnector } from '@web3-wallet/ethereum-connector';

type CoinbaseWalletSDKOptions = ConstructorParameters<
  typeof CoinbaseWalletSDK
>[0];

/**
 * @param options - Options to pass to `@coinbase/wallet-sdk`.
 * @param onError - Handler to report errors thrown from eventListeners.
 */
export interface CoinbaseWalletConstructorArgs {
  actions: Actions;
  options: CoinbaseWalletSDKOptions;
  onError?: (error: Error) => void;
}

export class CoinbaseWallet extends EthereumConnector {
  /** {@inheritdoc Connector.provider} */
  public override provider?: CoinbaseWalletProvider;

  private readonly options: CoinbaseWalletSDKOptions;

  /**
   * A `CoinbaseWalletSDK` instance.
   */
  public coinbaseWallet?: CoinbaseWalletSDK;

  constructor({ actions, options, onError }: CoinbaseWalletConstructorArgs) {
    super(actions, onError);
    this.options = options;
  }

  public detectProvider = async () => {
    if (this.provider) this.provider;

    const m = await import('@coinbase/wallet-sdk');
    this.coinbaseWallet = new m.default(this.options);
    this.provider = this.coinbaseWallet.makeWeb3Provider();

    return this.provider;
  };

  /** {@inheritdoc Connector.deactivate} */
  public override deactivate = async (): Promise<void> => {
    this.removeEventListeners();
    this.actions.resetState();
    this.coinbaseWallet?.disconnect();
  };
}
