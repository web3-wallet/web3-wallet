import type {
  AddEthereumChainParameter,
  ConnectorOptions,
} from '@web3-wallet/core';
import {
  type WalletName,
  Connector,
  isAddChainParameter,
  isChainId,
  utils,
} from '@web3-wallet/core';

import {
  type DeFiWalletProvider,
  type DeFiWalletProviderOptions,
  detectProvider,
} from './detectProvider';

const _name = 'Defi Wallet';
export const name = _name as WalletName<typeof _name>;

export type DeFiWalletExtensionOptions =
  ConnectorOptions<DeFiWalletProviderOptions>;
export class DeFiWalletExtension extends Connector<
  DeFiWalletProvider,
  DeFiWalletExtensionOptions
> {
  /** {@inheritdoc Connector.provider} */
  public override provider?: DeFiWalletProvider;

  /** {@inheritdoc Connector.constructor} */
  constructor(options: DeFiWalletExtensionOptions) {
    super(name, options);
  }

  /** {@inheritdoc Connector.detectProvider} */
  public async detectProvider() {
    if (this.provider) this.provider;

    const provider = await detectProvider();

    if (!provider) throw this.providerNotFoundError;

    this.provider = provider;

    return this.provider;
  }

  /** {@inheritdoc Connector.connect} */
  public override async connect(
    chainIdOrChainParameter?: number | AddEthereumChainParameter,
  ): Promise<void> {
    const cancelActivation = this.actions.startConnection();
    const chainId: number = isChainId(chainIdOrChainParameter)
      ? chainIdOrChainParameter
      : isAddChainParameter(chainIdOrChainParameter)
      ? chainIdOrChainParameter.chainId
      : 1;

    try {
      await this.lazyInitialize();
      if (!this.provider) throw this.providerNotFoundError;

      /**
       * so many bug in this.provider?.connect
       *
       * try to connect with desiredChainId:
       *
       *  1. if DeFi wallet have't connected and the wallet current chain are the same as the desiredChainId.
       *    a. calling `this.provider.connect` will summon up the DeDiWallet extension connect modal
       *    b. after connected to the desiredChainId, it will not fire the related events (it's a bug)
       *      - should fire `this.provider.on('connect', () => {})` with  chainId as accounts
       *
       *  2. if DeFi wallet have't connected and the wallet current chain are not the same as the desiredChainId.
       *    a. calling `this.provider.connect` will
       *      1. fire the `this.provider.on('disconnect')` event (this is a bug)
       *      2. summon up the DeDiWallet extension connect modal and connect to wallet if user allowed
       *    b. after connected to the desiredChainId, it will
       *      1. not fire the related events (it's a bug)
       *        - should fire `this.provider.on('connect', () => {})` with  chainId as accounts
       *
       *  3. If DeFi wallet have connected and the wallet
       *    a. calling `this.provider.connect` will
       *      1. fire the `this.provider.on('disconnect')` event (this is a bug)
       *
       */
      await this.provider.connect({
        ...(this.options as DeFiWalletExtensionOptions).providerOptions,
        chainId,
      });

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const receivedChainId = utils.parseChainId(this.provider.chainId!);

      /**
       * can't request `wallet_switchEthereumChain` before wallet got connected
       *
       * switch chain
       */
      if (chainId !== receivedChainId) {
        const desiredChainIdHex = utils.parseChainId(chainId);

        await this.provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: desiredChainIdHex }],
        });
      }
    } catch (e) {
      cancelActivation();
      throw e;
    } finally {
      /**
       * when user rejected to connect to wallet, it would throw a error and removed the wallet state.
       *
       * removing wallet state upon `user reject` is not the expected behavior,
       * we want to update the state back to store
       */
      if (this.provider?.chainId) {
        this.updateChainId(this.provider?.chainId);
      }
      if (this.provider?.accounts) {
        this.updateAccounts(this.provider?.accounts);
      }
    }
  }
}
