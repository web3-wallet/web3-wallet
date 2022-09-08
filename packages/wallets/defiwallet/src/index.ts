import type { Connector, WalletStoreActions } from '@web3-wallet/core';

import type { DeFiWalletProviderOptions } from './detectProvider';
import { DeFiWalletExtension } from './ExtensionConnector';
import { isMobile } from './isMobile';
import { DeFiWalletMobile } from './MobileConnector';

export const getDeFiWallet = (
  actions: WalletStoreActions,
  options: {
    extension: DeFiWalletProviderOptions;
  },
  onError?: Connector['onError'],
): DeFiWalletMobile | DeFiWalletExtension => {
  if (isMobile()) {
    return new DeFiWalletMobile(actions, onError);
  } else {
    return new DeFiWalletExtension(actions, options.extension, onError);
  }
};
