import type {
  CoinbaseWalletProvider,
  CoinbaseWalletSDK,
} from '@coinbase/wallet-sdk';
import { type WalletName, AbstractConnector } from '@web3-wallet/core';

type CoinbaseWalletSDKOptions = ConstructorParameters<
  typeof CoinbaseWalletSDK
>[0] & { url: string };

export const walletName = 'Coinbase Wallet' as WalletName<'Coinbase Wallet'>;

export class CoinbaseWallet extends AbstractConnector<CoinbaseWalletProvider> {
  public override provider?: CoinbaseWalletProvider;
  private readonly options: CoinbaseWalletSDKOptions;
  /**
   * A `CoinbaseWalletSDK` instance.
   */
  public coinbaseWallet?: CoinbaseWalletSDK;

  /**
   *
   * @param actions - wallet store actions
   * @param options - Options to pass to `@coinbase/wallet-sdk`.
   * @param onError - Handler to report errors thrown from eventListeners.
   */
  constructor(
    actions: AbstractConnector['actions'],
    options: CoinbaseWalletSDKOptions,
    onError?: AbstractConnector['onError'],
  ) {
    super(walletName, actions, onError);
    this.options = options;
  }

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

  public override async autoConnect(): Promise<boolean> {
    await this.lazyInitialize();

    if (!this.connected) {
      console.debug(`No existing connection`);
      return false;
    }
    return await super.autoConnect();
  }

  public override async disconnect(): Promise<void> {
    this.coinbaseWallet?.disconnect();
  }
}
