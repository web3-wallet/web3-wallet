import { AddEthereumChainParameter } from '@web3-wallet/connector';

/**
 * The largest possible chain ID we can handle.
 * Explanation: https://gist.github.com/rekmarks/a47bd5f2525936c4b8eee31a16345553
 */
export const MAX_SAFE_CHAIN_ID = 4503599627370476;

export const validateEvmChainId = (chainId: number): never | void => {
  if (
    !Number.isInteger(chainId) ||
    chainId <= 0 ||
    chainId > MAX_SAFE_CHAIN_ID
  ) {
    throw new Error(`Invalid chainId ${chainId}`);
  }
};

export const isValidEvmChainId = (chainId: number): boolean => {
  try {
    validateEvmChainId(chainId);
    return true;
  } catch (_) {
    return false;
  }
};

export const parseEvmChainId = (chainId: string | number) => {
  return typeof chainId === 'number'
    ? chainId
    : Number.parseInt(chainId, chainId.startsWith('0x') ? 16 : 10);
};

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
