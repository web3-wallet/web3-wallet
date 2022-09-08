import type {
  CoinbaseWalletProvider,
  CoinbaseWalletSDK,
} from '@coinbase/wallet-sdk';
import { type WalletName, Connector } from '@web3-wallet/core';

type CoinbaseWalletOptions = ConstructorParameters<
  typeof CoinbaseWalletSDK
>[0] & { url: string };

export const walletName = 'Coinbase Wallet' as WalletName<'Coinbase Wallet'>;

export class CoinbaseWallet extends Connector<CoinbaseWalletProvider> {
  /** {@inheritdoc Connector.provider} */
  public override provider?: CoinbaseWalletProvider;
  private readonly options: CoinbaseWalletOptions;
  /**
   * A `CoinbaseWalletSDK` instance.
   */
  public coinbaseWallet?: CoinbaseWalletSDK;

  /**
   * @param actions - wallet store actions
   * @param options - Options to pass to `@coinbase/wallet-sdk`.
   * @param onError - Handler to report errors thrown from eventListeners.
   */
  constructor(
    actions: Connector['actions'],
    options: CoinbaseWalletOptions,
    onError?: Connector['onError'],
  ) {
    super(walletName, actions, onError);
    this.options = options;
  }

  /** {@inheritdoc Connector.detectProvider} */
  public async detectProvider() {
    if (this.provider) this.provider;

    const m = await import('@coinbase/wallet-sdk');
    const { url, ...options } = this.options;

    this.coinbaseWallet = new m.default(options);
    this.provider = this.coinbaseWallet.makeWeb3Provider(url);

    return this.provider;
  }

  private get connected() {
    return !!this.provider?.selectedAddress;
  }

  /** {@inheritdoc Connector.autoConnect} */
  public override async autoConnect(): Promise<boolean> {
    await this.lazyInitialize();

    if (!this.connected) {
      console.debug(`No existing connection`);
      return false;
    }
    return await super.autoConnect();
  }

  /** {@inheritdoc Connector.disconnect} */
  public override async disconnect(): Promise<void> {
    this.coinbaseWallet?.disconnect();
  }
}
