import {
  type MetaMaskCompatibleConstructorArgs,
  MetaMaskCompatible,
} from '@web3-wallet/metamask-compatible';

export type ImTokenConstructorArgs = MetaMaskCompatibleConstructorArgs;

export class ImToken extends MetaMaskCompatible {
  constructor(arg: ImTokenConstructorArgs) {
    super(arg);
  }
}
