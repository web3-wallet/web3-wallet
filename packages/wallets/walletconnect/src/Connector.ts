import type _WalletConnectProvider from '@walletconnect/ethereum-provider';
import type { IWCEthRpcConnectionOptions } from '@walletconnect/types';
import {
  type Actions,
  type Provider,
  type WalletName,
  Connector,
} from '@web3-wallet/core';
import EventEmitter3 from 'eventemitter3';

export const URI_AVAILABLE = 'URI_AVAILABLE';

type WalletConnectProvider = _WalletConnectProvider & Provider;

export const walletName = 'WalletConnect' as WalletName<'WalletConnect'>;

export class WalletConnectConnector extends Connector {
  public provider?: WalletConnectProvider;
  public readonly events = new EventEmitter3();

  private readonly options: IWCEthRpcConnectionOptions;

  constructor({
    actions,
    options,
    onError,
  }: {
    actions: Actions;
    options: IWCEthRpcConnectionOptions;
    onError?: Connector['onError'];
  }) {
    super(walletName, actions, onError);
    this.options = options;
  }

  private onDisplayUri = (
    _: Error | null,
    payload: { params: string[] },
  ): void => {
    this.events.emit(URI_AVAILABLE, payload.params[0]);
  };

  public async detectProvider(): Promise<WalletConnectProvider> {
    const m = await import('@walletconnect/ethereum-provider');

    const provider = new m.default({
      ...this.options,
    }) as unknown as WalletConnectProvider;

    this.provider = provider;

    return provider;
  }

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

  public override async connectEagerly(): Promise<void> {
    await this.lazyInitialize();
    if (!this.provider?.connected) {
      throw Error('No existing connection');
    }
    await super.connectEagerly();
  }

  public override async activate(desiredChainId?: number): Promise<void> {
    super.activate(desiredChainId);
  }

  public override async deactivate(): Promise<void> {
    this.removeEventListeners?.();
    await this.provider?.disconnect();
    super.deactivate();
  }
}
