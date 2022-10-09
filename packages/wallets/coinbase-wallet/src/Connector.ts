import type {
  CoinbaseWalletProvider,
  CoinbaseWalletSDK,
} from '@coinbase/wallet-sdk';
import type { CoinbaseWalletSDKOptions } from '@coinbase/wallet-sdk/dist/CoinbaseWalletSDK';
import type { ConnectorOptions } from '@web3-wallet/core';
import { type WalletName, Connector } from '@web3-wallet/core';

import { icon } from './assets';

type ScanToConnectOptions = {
  rpcUrl: string;
  chainId: number;
};

type ProviderOptions = CoinbaseWalletSDKOptions & {
  scanToConnectOptions?: ScanToConnectOptions;
};

export const _name = 'Coinbase Wallet';
export const name = _name as WalletName<typeof _name>;

export type CoinbaseWalletOptions = ConnectorOptions<ProviderOptions>;

export class CoinbaseWallet extends Connector<CoinbaseWalletOptions> {
  public static walletName: WalletName<string> = name;
  public static walletIcon: string = icon;
  public name: WalletName<string> = name;

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
    super(options);
  }

  /** {@inheritdoc Connector.detectProvider} */
  public override async detectProvider() {
    if (this.provider) return this.provider;

    const m = await import('@coinbase/wallet-sdk');
    const { scanToConnectOptions, ...options } = (
      this.options as CoinbaseWalletOptions
    ).providerOptions;

    this.coinbaseWallet = new m.default(options);

    this.provider = this.coinbaseWallet.makeWeb3Provider(
      scanToConnectOptions?.rpcUrl,
      scanToConnectOptions?.chainId,
    );

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
