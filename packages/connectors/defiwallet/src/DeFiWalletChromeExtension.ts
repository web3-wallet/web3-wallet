import type { Actions, Provider } from '@web3-wallet/abstract-connector';
import { ProviderNoFoundError } from '@web3-wallet/abstract-connector';
import type {
  DeFiWalletChromeExtensionEthereumProvider,
  DeFiWalletChromeExtensionEthereumProviderOptions,
} from '@web3-wallet/detect-defiwallet';
import { EthereumConnector, utils } from '@web3-wallet/ethereum-connector';

/**
 * @param onError - Handler to report errors thrown from eventListeners.
 */
export interface DeFiWalletChromeExtensionConstructorArgs {
  actions: Actions;
  onError?: EthereumConnector['onError'];
  options: DeFiWalletChromeExtensionEthereumProviderOptions;
}

const providerNotFoundError = new ProviderNoFoundError(
  'DeFi Wallet provider not found',
);

export class DeFiWalletChromeExtension extends EthereumConnector {
  public override provider?: Provider &
    DeFiWalletChromeExtensionEthereumProvider;
  private options: DeFiWalletChromeExtensionEthereumProviderOptions;

  constructor({
    actions,
    options,
    onError,
  }: DeFiWalletChromeExtensionConstructorArgs) {
    super(actions, onError);
    this.options = options;
  }

  public detectProvider = async () => {
    if (this.provider) this.provider;

    const { detectDeFiWalletChromeExtensionEthereumProvider } = await import(
      '@web3-wallet/detect-defiwallet'
    );

    const provider = await detectDeFiWalletChromeExtensionEthereumProvider();

    if (!provider) throw providerNotFoundError;

    this.provider = provider as Provider &
      DeFiWalletChromeExtensionEthereumProvider;

    return this.provider;
  };

  public override async activate(chainId: number): Promise<void> {
    const cancelActivation = this.actions.startActivation();

    try {
      await this.lazyInitialize();
      if (!this.provider) throw providerNotFoundError;

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
       * can't request `wallet_switchEthereumChain` before wallet got connected chain
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

  public override deactivate = async () => {
    if (!this.provider) throw providerNotFoundError;

    this.resetState();
    await this.provider.close();
  };
}
