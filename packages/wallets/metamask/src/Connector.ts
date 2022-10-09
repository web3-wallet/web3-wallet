import type { Provider, ProviderRpcError, WalletName } from '@web3-wallet/core';
import { Connector } from '@web3-wallet/core';

import { icon } from './assets';

const providerFilter = (p: Provider) => !!p.isMetaMask;

const _name = 'MetaMask';
export const name = _name as WalletName<typeof _name>;

export class MetaMask extends Connector {
  public static walletName: WalletName<string> = name;
  public static walletIcon: string = icon;
  public name: WalletName<string> = name;

  /** {@inheritdoc Connector.constructor} */
  constructor(options?: Connector['options']) {
    super({
      providerFilter,
      ...options,
    });
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
  protected override onDisconnect(_: ProviderRpcError): void {}
}
