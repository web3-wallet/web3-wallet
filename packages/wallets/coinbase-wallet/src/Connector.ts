import type {
  CoinbaseWalletProvider,
  CoinbaseWalletSDK,
} from '@coinbase/wallet-sdk';
import { Connector, WalletName } from '@web3-wallet/core';

type CoinbaseWalletSDKOptions = ConstructorParameters<
  typeof CoinbaseWalletSDK
>[0];

const walletName = 'Coinbase Wallet' as WalletName<'Coinbase Wallet'>;

/**
 * @param options - Options to pass to `@coinbase/wallet-sdk`.
 * @param onError - Handler to report errors thrown from eventListeners.
 */
export class CoinbaseWalletConnector extends Connector {
  public override provider?: CoinbaseWalletProvider;
  private readonly options: CoinbaseWalletSDKOptions;

  /**
   * A `CoinbaseWalletSDK` instance.
   */
  public coinbaseWallet?: CoinbaseWalletSDK;

  constructor(
    actions: Connector['actions'],
    options: CoinbaseWalletSDKOptions,
    onError?: Connector['onError'],
  ) {
    super(walletName, actions, onError);
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
