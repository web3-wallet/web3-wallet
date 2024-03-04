import type {
  AddEthereumChainParameter,
  ConnectorOptions,
  Provider,
  ProviderRpcError,
} from '@react-web3-wallet/core';
import { type WalletName, Connector } from '@react-web3-wallet/core';
import type IWalletConnectProvider from '@walletconnect/ethereum-provider';
import EventEmitter3 from 'eventemitter3';

import { icon } from './assets';

export const URI_AVAILABLE = 'URI_AVAILABLE';

const _walletName = 'WalletConnect';
const walletName = _walletName as WalletName<typeof _walletName>;

type WalletConnectProvider = IWalletConnectProvider & Provider;

export type WalletConnectOptions = ConnectorOptions<
  Parameters<typeof IWalletConnectProvider.init>[0]
>;

/**
 * @param chains - The chain ID list
 * @param defaultChainId - The first chainID in chains will used as the default chain ID
 */
function sortChainIds(chains: number[], defaultChainId: number) {
  const idx = chains.indexOf(defaultChainId);

  if (idx === -1) return chains;

  // move defaultChainId to the first place
  const ordered = [...chains];
  ordered.splice(idx, 1);
  return [defaultChainId, ...ordered];
}

export class WalletConnect extends Connector<WalletConnectOptions> {
  public static walletName: WalletName<string> = walletName;
  public static walletIcon: string = icon;
  public walletName: WalletName<string> = walletName;

  /** {@inheritdoc Connector.provider} */
  public override provider?: WalletConnectProvider;
  public readonly events = new EventEmitter3();

  constructor(options: WalletConnectOptions) {
    super(options);
  }

  private onDisplayUri = (uri: string): void => {
    this.events.emit(URI_AVAILABLE, uri);
  };

  /** {@inheritdoc Connector.detectProvider} */
  public override async detectProvider(): Promise<WalletConnectProvider> {
    if (this.provider) return this.provider;

    const m = await import('@walletconnect/ethereum-provider');
    const { providerOptions } = this.options as WalletConnectOptions;

    const provider = (await m.default.init(
      providerOptions,
    )) as unknown as WalletConnectProvider;

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
    this.provider.on('display_uri', onDisplayUri);

    return () => {
      if (!this.provider) return;
      removeEventListeners?.();

      if (typeof this.provider.off === 'function') {
        this.provider.off('display_uri', onDisplayUri);
      }

      if (typeof this.provider.removeListener === 'function') {
        this.provider.removeListener('display_uri', onDisplayUri);
      }
    };
  }

  /**
   * @param desiredChainId - The desired chainId to connect to.
   */
  public override async connect(
    desiredChainId?: number | AddEthereumChainParameter,
  ): Promise<void> {
    await this.lazyInitialize();

    // walletconnect does not allow to add new chains
    desiredChainId =
      typeof desiredChainId === 'number'
        ? desiredChainId
        : desiredChainId?.chainId;

    // We know that provider must be available
    const provider = this.provider as WalletConnectProvider;

    // already connected, check if need to switch to another chain
    if (provider.session) {
      if (!desiredChainId || desiredChainId === provider.chainId) {
        // When desiredChainId is not passed or desiredChainId is the current connected chain
        // There's no need to connect/switch to wallet.
        this.actions.update({
          chainId: provider.chainId,
          accounts: provider.accounts,
        });

        return;
      }

      const isConnectedToDesiredChain =
        provider.session.namespaces.eip155.accounts.some((account) => {
          // eip155 account format: `eip155:${chainId}:${address}`
          return account.startsWith(`eip155:${desiredChainId}:`);
        });

      if (!isConnectedToDesiredChain) {
        if (
          this.options?.providerOptions.optionalChains?.includes(desiredChainId)
        ) {
          throw new Error(
            `Cannot activate an optional chain (${desiredChainId}) as the wallet app is not connected to it.`,
          );
        }

        throw new Error(`Unknown chain (${desiredChainId})`);
      }

      // the wallet app itself have connected to the desired chain,
      // but it's not the chain the dapp connected to, so we need to
      // tell the wallet app that the dApp want to switch to the desired chain.
      await this.switchChain(desiredChainId);
      // Not all the wallet triggers the `chainChanged` event after chain switched.
      // So we updates the chainId and accounts manually
      this.actions.update({
        chainId: provider.chainId,
        accounts: provider.accounts,
      });

      return;
    }

    const cancelActivation = this.actions.startConnection();

    try {
      const chains = this.options?.providerOptions.chains ?? [];

      const sortedChainIds = desiredChainId
        ? sortChainIds(chains, desiredChainId)
        : chains;

      await provider.connect({
        chains: sortedChainIds,
      });

      if (desiredChainId && desiredChainId !== sortedChainIds[0]) {
        await this.switchChain(desiredChainId);
      }

      this.actions.update({
        chainId: provider.chainId,
        accounts: provider.accounts,
      });
    } catch (error) {
      await this.disconnect();
      cancelActivation();
      throw error;
    }
  }

  /** {@inheritdoc Connector.autoConnect} */
  public override async autoConnect(): Promise<boolean> {
    await this.lazyInitialize();

    // WalletConnect automatically persists and restores active sessions
    // We only try autoConnect when session exists.
    if (!this.provider?.session) return false;

    return await super.autoConnect();
  }

  /**
   * {@inheritdoc Connector.onDisconnect}
   */
  protected override onDisconnect(_: ProviderRpcError): void {
    /**
     * force disconnect(reset provider) to avoid some edge walletconnect disconnect issue
     */
    this.disconnect();
  }

  /** {@inheritdoc Connector.disconnect} */
  public override async disconnect(force = true): Promise<void> {
    if (force) {
      this.removeEventListeners?.();

      try {
        await this.provider?.disconnect();
      } catch (error) {
        // ignore disconnect error
        console.debug(error);
      }
      /**
       * walletconnect sdk will throw alway the existing provider after disconnect.
       *
       * need to set provider to undefined so that a new provider can be created next time.
       */
      this.provider = undefined;
    }

    super.disconnect();
  }
}
