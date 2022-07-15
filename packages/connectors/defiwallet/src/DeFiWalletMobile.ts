import type { Actions, Provider } from '@web3-wallet/abstract-connector';
import { ProviderNoFoundError } from '@web3-wallet/abstract-connector';
import type {
  DefiWalletMobileEthereumProvider,
  DefiWalletMobileEthereumProviderOptions,
} from '@web3-wallet/detect-defiwallet';
import { EthereumConnector } from '@web3-wallet/ethereum-connector';

/**
 * @param onError - Handler to report errors thrown from eventListeners.
 */
export interface DeFiWalletMobileConstructorArgs {
  actions: Actions;
  onError?: EthereumConnector['onError'];
  options?: DefiWalletMobileEthereumProviderOptions;
}

const providerNotFoundError = new ProviderNoFoundError(
  'DeFi Wallet provider not found',
);

export class DeFiWalletMobile extends EthereumConnector {
  public override provider?: Provider & DefiWalletMobileEthereumProvider;
  private options?: unknown;

  constructor({ actions, options, onError }: DeFiWalletMobileConstructorArgs) {
    super(actions, onError);
    this.options = options;
  }

  public detectProvider = async () => {
    if (this.provider) this.provider;

    const { detectDeFiWalletMobileEthereumProvider } = await import(
      '@web3-wallet/detect-defiwallet'
    );

    const provider = await detectDeFiWalletMobileEthereumProvider();

    if (!provider) throw providerNotFoundError;

    this.provider = provider as Provider & DefiWalletMobileEthereumProvider;

    return this.provider;
  };
}
