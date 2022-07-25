import type {
  CoinbaseWalletProvider,
  CoinbaseWalletSDK,
} from '@coinbase/wallet-sdk';
import { EthereumConnector } from '@web3-wallet/ethereum';

type CoinbaseWalletSDKOptions = ConstructorParameters<
  typeof CoinbaseWalletSDK
>[0];

/**
 * @param options - Options to pass to `@coinbase/wallet-sdk`.
 * @param onError - Handler to report errors thrown from eventListeners.
 */
export class CoinbaseWalletConnector extends EthereumConnector {
  public override provider?: CoinbaseWalletProvider;
  private readonly options: CoinbaseWalletSDKOptions;

  /**
   * A `CoinbaseWalletSDK` instance.
   */
  public coinbaseWallet?: CoinbaseWalletSDK;

  constructor(
    actions: EthereumConnector['actions'],
    options: CoinbaseWalletSDKOptions,
    onError?: EthereumConnector['onError'],
  ) {
    super(actions, onError);
    this.options = options;
  }

  public async detectProvider() {
    if (this.provider) this.provider;

    const m = await import('@coinbase/wallet-sdk');
    this.coinbaseWallet = new m.default(this.options);
    this.provider = this.coinbaseWallet.makeWeb3Provider();

    return this.provider;
  }

  public override async deactivate(): Promise<void> {
    this.coinbaseWallet?.disconnect();
  }
}
