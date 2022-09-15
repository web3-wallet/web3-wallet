import type {
  CoinbaseWalletProvider,
  CoinbaseWalletSDK,
} from '@coinbase/wallet-sdk';
import type { ConnectorOptions } from '@web3-wallet/core';
import { type WalletName, Connector } from '@web3-wallet/core';

type CoinbaseWalletProviderOptions = ConstructorParameters<
  typeof CoinbaseWalletSDK
>[0] & { url: string };

export const _name = 'Coinbase Wallet';
export const name = _name as WalletName<typeof _name>;

export type CoinbaseWalletOptions =
  ConnectorOptions<CoinbaseWalletProviderOptions>;

export class CoinbaseWallet extends Connector<
  CoinbaseWalletProvider,
  CoinbaseWalletOptions
> {
  /** {@inheritdoc Connector.provider} */
  public override provider?: CoinbaseWalletProvider;
  /**
   * A `CoinbaseWalletSDK` instance.
   */
  public coinbaseWallet?: CoinbaseWalletSDK;

  /**
   * {@inheritdoc Connector.constructor}
   *
   * @param options - Options to pass to `@coinbase/wallet-sdk`.
   */
  constructor(options: CoinbaseWalletOptions) {
    super(name, options);
  }

  /** {@inheritdoc Connector.detectProvider} */
  public override async detectProvider() {
    if (this.provider) this.provider;

    const m = await import('@coinbase/wallet-sdk');
    const { url, ...options } = (this.options as CoinbaseWalletOptions)
      .providerOptions;

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
  public override async disconnect(force = true): Promise<void> {
    await super.disconnect();
    if (force) {
      await this.coinbaseWallet?.disconnect();
    }
  }
}
