import type { DeFiWalletProviderOptions } from './detectProvider';
import { DeFiWalletExtension } from './ExtensionConnector';
import { isMobile } from './isMobile';
import { DeFiWalletMobile } from './MobileConnector';

export const getDeFiWallet = (options: {
  extension: DeFiWalletProviderOptions;
}): DeFiWalletMobile | DeFiWalletExtension => {
  if (isMobile()) {
    return new DeFiWalletMobile();
  } else {
    return new DeFiWalletExtension({
      providerOptions: options.extension,
    });
  }
};

export * from './assets';
