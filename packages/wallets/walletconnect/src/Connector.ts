import type _WalletConnectProvider from '@walletconnect/ethereum-provider';
import type { IWCEthRpcConnectionOptions } from '@walletconnect/types';
import type { ConnectorOptions, ProviderRpcError } from '@web3-wallet/core';
import { type Provider, type WalletName, Connector } from '@web3-wallet/core';
import EventEmitter3 from 'eventemitter3';

import { icon } from './assets';

export const URI_AVAILABLE = 'URI_AVAILABLE';

type WalletConnectProvider = _WalletConnectProvider & Provider;

const _name = 'WalletConnect';
export const name = _name as WalletName<typeof _name>;

export type WalletConnectOptions = ConnectorOptions<IWCEthRpcConnectionOptions>;

export class WalletConnect extends Connector<WalletConnectOptions> {
  public static walletName: WalletName<string> = name;
  public static walletIcon: string = icon;
  public name: WalletName<string> = name;

  /** {@inheritdoc Connector.provider} */
  public override provider?: WalletConnectProvider;
  public readonly events = new EventEmitter3();

  constructor(options: WalletConnectOptions) {
    super(options);
  }

  private onDisplayUri = (
    _: Error | null,
    payload: { params: string[] },
  ): void => {
    this.events.emit(URI_AVAILABLE, payload.params[0]);
  };

  /** {@inheritdoc Connector.detectProvider} */
  public override async detectProvider(): Promise<WalletConnectProvider> {
    if (this.provider) return this.provider;

    const m = await import('@walletconnect/ethereum-provider');

    const provider = new m.default({
      ...(this.options as WalletConnectOptions).providerOptions,
    }) as unknown as WalletConnectProvider;

    this.provider = provider;

    return provider;
  }

  /** {@inheritdoc Connector.requestAccounts} */
  protected override async requestAccounts(): Promise<string[]> {
    if (!this.provider) throw this.providerNotFoundError;

    try {
      const accounts = await this.provider.request<string[]>({
        method: 'eth_requestAccounts',
      });
      return accounts;
    } catch (error: unknown) {
      if ((error as Error).message === 'User closed modal') {
        await this.disconnect();
      }

      throw error;
    }
  }

  /** {@inheritdoc Connector.addEventListeners} */
  protected override addEventListeners(): Connector['removeEventListeners'] {
    if (!this.provider) return;

    const removeEventListeners = super.addEventListeners();
    const onDisplayUri = this.onDisplayUri.bind(this);
    this.provider.connector.on('display_uri', onDisplayUri);

    return () => {
      if (!this.provider) return;
      removeEventListeners?.();

      if (typeof this.provider.off === 'function') {
        this.provider.off('display_uri', onDisplayUri);
      } else if (typeof this.provider.removeListener === 'function') {
        this.provider.removeListener('display_uri', onDisplayUri);
      }
    };
  }

  /** {@inheritdoc Connector.autoConnect} */
  public override async autoConnect(): Promise<boolean> {
    await this.lazyInitialize();
    if (!this.provider?.connected) {
      console.debug('No existing connection');
      return false;
    }
    return await super.autoConnect();
  }

  /**
   * {@inheritdoc Connector.onDisconnect}
   */
  protected override onDisconnect(_: ProviderRpcError): void {
    /**
     * force disconnect(reset provider) to avoid some edge walletconnect disconnect issue
     */
    this.disconnect(true);
  }

  /** {@inheritdoc Connector.disconnect} */
  public override async disconnect(force = true): Promise<void> {
    super.disconnect();
    if (force) {
      this.removeEventListeners?.();
      await this.provider?.disconnect();
      /**
       * walletconnect sdk will throw alway the existing provider after disconnect.
       *
       * need to set provider to undefined so that a new provider can be created next time.
       */
      this.provider = undefined;
    }
  }
}
