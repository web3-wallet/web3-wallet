import type { Actions, EthereumConnector } from '@web3-wallet/ethereum';

import type { DeFiWalletProviderOptions } from './detectProvider';
import { ExtensionConnector } from './ExtensionConnector';
import { isMobile } from './isMobile';
import { MobileConnector } from './MobileConnector';

export const getDeFiWallet = (
  actions: Actions,
  options: {
    extension: DeFiWalletProviderOptions;
  },
  onError?: EthereumConnector['onError'],
): MobileConnector | ExtensionConnector => {
  if (isMobile()) {
    return new MobileConnector(actions, onError);
  } else {
    return new ExtensionConnector(actions, options.extension, onError);
  }
};
