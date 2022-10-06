/* eslint-disable @typescript-eslint/no-explicit-any */
import type { EventEmitter } from 'node:events';

/**
 * Defined in EIP-1193
 *
 * See
 *  - {@link https://eips.ethereum.org/EIPS/eip-1193 | EIP-1193}
 */
export interface RequestArguments {
  readonly method: string;
  readonly params?: readonly unknown[] | object;
}

/**
 * Defined in EIP-1193
 *
 * See
 *  - {@link https://eips.ethereum.org/EIPS/eip-1193 | EIP-1193}
 */
export interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

/**
 * Defined in EIP-1193
 *
 * See
 *  - {@link https://eips.ethereum.org/EIPS/eip-1193 | EIP-1193}
 */
export interface ProviderConnectInfo {
  isConnecting: boolean;
  chainId: string;
  accounts?: string[];
}

/**
 * dApps need retrieve the provider from the the host environment, but it may fail to retrieve the provider.
 * ProviderNoFoundError should be thrown when a operation requires a provider, but there's no provider.
 */
export class ProviderNoFoundError extends Error {
  public constructor(message = 'Provider not found') {
    super(message);
    this.name = ProviderNoFoundError.name;
    Object.setPrototypeOf(this, ProviderNoFoundError.prototype);
  }
}

/**
 * See
 *  - {@link https://eips.ethereum.org/EIPS/eip-3085 | EIP 3085}
 *  - {@link https://docs.metamask.io/guide/rpc-api.html#wallet-addethereumchain | MetaMask wallet_addEthereumChain}
 */
export interface AddEthereumChainParameter {
  chainId: number;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: 18;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  /**
   * Currently ignored.
   */
  iconUrls?: string[];
}

/**
 * See
 *  - {@link https://github.com/ethereum/EIPs/blob/master/EIPS/eip-747.md | EIP-747}
 *  - {@link https://docs.metamask.io/guide/rpc-api.html#wallet-watchasset | EIP-747 wallet_watchAsset}
 */
export interface WatchAssetParameters {
  address: string;
  symbol: string;
  decimals: number;
  image: string;
}

type WalletPermissionCaveat = {
  type: string;
  value: any;
};

type WalletPermission = {
  caveats: WalletPermissionCaveat[];
  date: number;
  id: string;
  invoker: `http://${string}` | `https://${string}`;
  parentCapability: 'eth_accounts' | string;
};

interface InjectedProviderFlags {
  isBitKeep?: boolean;
  isMetaMask?: boolean;
  isBraveWallet?: boolean;
  isCoinbaseWallet?: boolean;
  isExodus?: boolean;
  isFrame?: boolean;
  isMathWallet?: boolean;
  isOneInchAndroidWallet?: boolean;
  isOneInchIOSWallet?: boolean;
  isOpera?: boolean;
  isTally?: boolean;
  isTokenPocket?: boolean;
  isTokenary?: boolean;
  isTrust?: boolean;
  isDesktopWallet?: boolean;
  isImToken?: boolean;
}

export interface Provider extends InjectedProviderFlags, EventEmitter {
  providers?: Provider[];

  /**
   * EIP-747: Add wallet_watchAsset to Provider
   * https://eips.ethereum.org/EIPS/eip-747
   */
  request(args: {
    method: 'wallet_watchAsset';
    params: WatchAssetParameters;
  }): Promise<boolean>;

  /**
   * EIP-1193: Ethereum Provider JavaScript API
   * https://eips.ethereum.org/EIPS/eip-1193
   */
  request(args: { method: 'eth_accounts' }): Promise<string[]>;
  request(args: { method: 'eth_chainId' }): Promise<string>;
  request(args: { method: 'eth_requestAccounts' }): Promise<string[]>;

  /**
   * EIP-1474: Remote procedure call specification
   * https://eips.ethereum.org/EIPS/eip-1474
   */
  request(args: { method: 'web3_clientVersion' }): Promise<string>;

  /**
   * EIP-2255: Wallet Permissions System
   * https://eips.ethereum.org/EIPS/eip-2255
   */
  request(args: {
    method: 'wallet_requestPermissions';
    params: [{ eth_accounts: Record<string, any> }];
  }): Promise<WalletPermission[]>;
  request(args: {
    method: 'wallet_getPermissions';
  }): Promise<WalletPermission[]>;

  /**
   * EIP-3085: Wallet Add Ethereum Chain RPC Method
   * https://eips.ethereum.org/EIPS/eip-3085
   */
  request(args: {
    method: 'wallet_addEthereumChain';
    params: AddEthereumChainParameter[];
  }): Promise<null>;

  /**
   * EIP-3326: Wallet Switch Ethereum Chain RPC Method
   * https://eips.ethereum.org/EIPS/eip-3326
   */
  request(args: {
    method: 'wallet_switchEthereumChain';
    params: [{ chainId: string }];
  }): Promise<null>;

  request<T>(args: RequestArguments): Promise<T>;
}

export const isChainId = (
  chainIdOrChainParameter?: number | AddEthereumChainParameter,
): chainIdOrChainParameter is number => {
  return typeof chainIdOrChainParameter === 'number';
};

export const isAddChainParameter = (
  chainIdOrChainParameter?: number | AddEthereumChainParameter,
): chainIdOrChainParameter is AddEthereumChainParameter => {
  return !isChainId(chainIdOrChainParameter);
};
