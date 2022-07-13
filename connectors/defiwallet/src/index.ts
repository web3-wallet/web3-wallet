import { Actions } from '@web3-wallet/connector';
import { EthereumConnector } from '@web3-wallet/ethereum-connector';

import {
  type DeFiWalletChromeExtensionConstructorArgs,
  DeFiWalletChromeExtension,
} from './DeFiWalletChromeExtension';
import {
  type DeFiWalletMobileConstructorArgs,
  DeFiWalletMobile,
} from './DeFiWalletMobile';
import { isMobile } from './isMobile';

export interface DeFiWalletContractorArgs {
  actions: Actions;
  options: {
    defiWalletMobileOptions: DeFiWalletMobileConstructorArgs['options'];
    defiWalletChromeExtensionOptions: DeFiWalletChromeExtensionConstructorArgs['options'];
  };
  onError?: EthereumConnector['onError'];
}

export const getDeFiWallet = ({
  actions,
  options,
  onError,
}: DeFiWalletContractorArgs): DeFiWalletMobile | DeFiWalletChromeExtension => {
  if (isMobile()) {
    return new DeFiWalletMobile({
      actions,
      options: options.defiWalletMobileOptions,
      onError,
    });
  } else {
    return new DeFiWalletChromeExtension({
      actions,
      options: options.defiWalletChromeExtensionOptions,
      onError,
    });
  }
};
