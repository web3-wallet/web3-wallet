import {
  type MetaMaskCompatibleConstructorArgs,
  MetaMaskCompatible,
} from '@web3-wallet/metamask-compatible';

export type MetaMaskConstructorArgs = MetaMaskCompatibleConstructorArgs;

export class MetaMask extends MetaMaskCompatible {}
