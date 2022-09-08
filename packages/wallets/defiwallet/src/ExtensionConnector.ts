import {
  type WalletName,
  type WalletStoreActions,
  Connector,
  utils,
} from '@web3-wallet/core';

import {
  type DeFiWalletProvider,
  type DeFiWalletProviderOptions,
  detectProvider,
} from './detectProvider';

export const walletName = 'DeFi Wallet' as WalletName<'DeFi Wallet'>;

export class DeFiWalletExtension extends Connector<DeFiWalletProvider> {
  public override provider?: DeFiWalletProvider;
  private options: DeFiWalletProviderOptions;

  constructor(
    actions: WalletStoreActions,
    options: DeFiWalletProviderOptions,
    onError?: Connector['onError'],
  ) {
    super(walletName, actions, onError);
    this.options = options;
  }

  public async detectProvider() {
    if (this.provider) this.provider;

    const provider = await detectProvider();

    if (!provider) throw this.providerNotFoundError;

    this.provider = provider;

    return this.provider;
  }

  public override async connect(chainId: number): Promise<void> {
    const cancelActivation = this.actions.startConnection();

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
        ...this.options,
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
