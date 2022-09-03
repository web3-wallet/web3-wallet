import type _WalletConnectProvider from '@walletconnect/ethereum-provider';
import type { IWCEthRpcConnectionOptions } from '@walletconnect/types';
import {
  type Actions,
  type Provider,
  type WalletName,
  Connector,
  utils,
} from '@web3-wallet/core';
import EventEmitter3 from 'eventemitter3';

import { getBestUrl } from './utils';

export const URI_AVAILABLE = 'URI_AVAILABLE';

type WalletConnectProvider = _WalletConnectProvider & Provider;

export const walletName = 'WalletConnect' as WalletName<'WalletConnect'>;

type WalletConnectOptions = Omit<
  IWCEthRpcConnectionOptions,
  'rpc' | 'infuraId' | 'chainId'
> & {
  rpc: { [chainId: number]: string | string[] };
};

export class WalletConnectConnector extends Connector {
  public provider?: WalletConnectProvider;
  public readonly events = new EventEmitter3();

  private readonly options: Omit<WalletConnectOptions, 'rpc'>;
  private readonly rpc: { [chainId: number]: string[] };
  private readonly defaultChainId: number;
  private readonly timeout: number;

  constructor({
    actions,
    options,
    onError,
    defaultChainId = 1,
    timeout = 5000,
  }: {
    actions: Actions;
    options: WalletConnectOptions;
    onError?: Connector['onError'];
    defaultChainId?: number;
    timeout?: number;
  }) {
    super(walletName, actions, onError);

    const { rpc, ...rest } = options;
    this.options = rest;
    this.rpc = Object.keys(rpc).reduce<{ [chainId: number]: string[] }>(
      (acc, chainId) => {
        const value = rpc[utils.parseChainId(chainId)];
        acc[utils.parseChainId(chainId)] = Array.isArray(value)
          ? value
          : [value];
        return acc;
      },
      {},
    );
    this.defaultChainId =
      defaultChainId ?? utils.parseChainId(Object.keys(this.rpc)[0]);
    this.timeout = timeout;
  }

  private onDisplayUri = (
    _: Error | null,
    payload: { params: string[] },
  ): void => {
    this.events.emit(URI_AVAILABLE, payload.params[0]);
  };

  public async detectProvider(): Promise<WalletConnectProvider> {
    // because we can only use 1 url per chainId, we need to decide between multiple, where necessary
    const results = await Promise.all(
      Object.keys(this.rpc).map(
        async (chainId): Promise<[number, string]> => [
          utils.parseChainId(chainId),
          await getBestUrl(this.rpc[utils.parseChainId(chainId)], this.timeout),
        ],
      ),
    );

    const rpc = results.reduce<{ [chainId: number]: string }>(
      (acc, [chainId, url]) => {
        acc[chainId] = url;
        return acc;
      },
      {},
    );

    const m = await import('@walletconnect/ethereum-provider');

    const provider = new m.default({
      ...this.options,
      chainId: this.defaultChainId,
      rpc,
    }) as unknown as WalletConnectProvider;

    this.provider = provider;

    return provider;
  }

  protected override addEventListeners(): () => void {
    if (!this.provider) throw this.providerNotFoundError;

    const removeEventListeners = super.addEventListeners();
    const onDisplayUri = this.onDisplayUri.bind(this);
    this.provider.connector.on('display_uri', onDisplayUri);

    return () => {
      if (!this.provider) return;
      removeEventListeners();

      if (typeof this.provider.off === 'function') {
        this.provider.off('display_uri', onDisplayUri);
      } else if (typeof this.provider.removeListener === 'function') {
        this.provider.removeListener('display_uri', onDisplayUri);
      }
    };
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
