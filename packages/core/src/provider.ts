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
export interface Provider extends EventEmitter {
  request<T>(args: RequestArguments): Promise<T>;
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
 *  - {@link https://eips.ethereum.org/EIPS/eip-3326 | EIP-3326}
 *  - {@link https://docs.metamask.io/guide/rpc-api.html#unrestricted-methods | MetaMask wallet_switchEthereumChain}
 */
export interface SwitchEthereumChainParameter {
  chainId: number;
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
