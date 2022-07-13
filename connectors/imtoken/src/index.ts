import {
  type MetaMaskCompatibleConstructorArgs,
  type MetaMaskCompatibleProvider,
  MetaMaskCompatible,
} from '@web3-wallet/metamask-compatible';

export type ImTokenConstructorArgs = MetaMaskCompatibleConstructorArgs;

export type ImTokenProvider = MetaMaskCompatibleProvider & {
  isImToken?: boolean;
};

const providerFilter = (p: ImTokenProvider) => !!p.isImToken;

export class ImToken extends MetaMaskCompatible {
  public override detectProvider = async () => {
    return await super.detectProvider(providerFilter);
  };

  constructor(arg: ImTokenConstructorArgs) {
    super(arg);
  }
}
