import type {
  ConnectorOptions,
  Provider,
  ProviderRpcError,
  WalletName,
} from '@web3-wallet/core';
import { Connector } from '@web3-wallet/core';

export type MetaMaskProvider = Provider & {
  isMetaMask?: boolean;
};

export type MetaMaskOptions = ConnectorOptions;

const _name = 'MetaMask';
export const name = _name as WalletName<typeof _name>;
const providerFilter = (p: MetaMaskProvider) => !!p.isMetaMask;

export class MetaMask extends Connector<MetaMaskProvider, MetaMaskOptions> {
  /** {@inheritdoc Connector.constructor} */
  constructor(options?: MetaMaskOptions) {
    super(name, options);
  }

  /**
   * {@inheritdoc Connector.constructor}
   *
   * Certain versions of MetaMask incorrectly emit the "disconnect" event when chain is changed.
   * need to override the default "onDisconnect" method, so that we don't reset the connector
   * store state.
   *
   * @see: https://github.com/MetaMask/metamask-extension/issues/13375#issuecomment-1027663334
   *
   */
  protected override onDisconnect(error: ProviderRpcError): void {
    this.options?.onError?.(error);
  }

  /** {@inheritdoc Connector.detectProvider} */
  public override async detectProvider(): Promise<MetaMaskProvider> {
    return await super.detectProvider(providerFilter);
  }
}
