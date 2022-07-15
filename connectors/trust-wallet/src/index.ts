import {
  type MetaMaskCompatibleConstructorArgs,
  type MetaMaskCompatibleProvider,
  MetaMaskCompatible,
} from '@web3-wallet/metamask-compatible';

export type TrustWalletConstructorArgs = MetaMaskCompatibleConstructorArgs;

export type TrustWalletProvider = MetaMaskCompatibleProvider & {
  isTrust?: boolean;
};

const providerFilter = (p: TrustWalletProvider) => !!p.isTrust;

export class TrustWallet extends MetaMaskCompatible {
  public override detectProvider = async () => {
    return await super.detectProvider(providerFilter);
  };
}
