import type { Actions } from '../../types';
import type { EthereumConnector } from '../EthereumConnector';
import type { InjectedConnector } from '../InjectedConnector';
import type { DeFiWalletProviderOptions } from './detectProvider';
import { ExtensionConnector } from './ExtensionConnector';
import { isMobile } from './isMobile';
import { MobileConnector } from './MobileConnector';

export const getDeFiWallet = (
  actions: Actions,
  options: {
    extension: DeFiWalletProviderOptions;
    mobile: InjectedConnector['options'];
  },
  onError?: EthereumConnector['onError'],
): MobileConnector | ExtensionConnector => {
  if (isMobile()) {
    return new MobileConnector(actions, options.mobile, onError);
  } else {
    return new ExtensionConnector(actions, options.extension, onError);
  }
};
