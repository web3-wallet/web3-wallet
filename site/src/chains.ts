import type { AddEthereumChainParameter } from '@web3-wallet/core';

const INFURA_KEY = process.env.infuraKey;
const ALCHEMY_KEY = process.env.alchemyKey;

export const CHAINS: AddEthereumChainParameter[] = [
  {
    chainId: 1,
    chainName: 'Mainnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: [
      INFURA_KEY ? `https://mainnet.infura.io/v3/${INFURA_KEY}` : '',
      ALCHEMY_KEY ? `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_KEY}` : '',
      'https://cloudflare-eth.com',
    ],
    blockExplorerUrls: ['https://etherscan.io'],
  },
  {
    chainId: 25,
    chainName: 'Cronos',
    nativeCurrency: {
      name: 'CRO',
      symbol: 'CRO',
      decimals: 18,
    },
    rpcUrls: ['https://evm-cronos.crypto.org'],
    blockExplorerUrls: ['https://cronoscan.com/'],
  },
  {
    chainId: 5,
    chainName: 'Görli',
    nativeCurrency: {
      name: 'Görli Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: [INFURA_KEY ? `https://goerli.infura.io/v3/${INFURA_KEY}` : ''],
  },
  {
    chainId: 3,
    chainName: 'Ropsten',
    nativeCurrency: {
      name: 'Ropsten Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: [INFURA_KEY ? `https://ropsten.infura.io/v3/${INFURA_KEY}` : ''],
    blockExplorerUrls: ['https://ropsten.etherscan.io'],
  },
  {
    chainId: 338,
    chainName: 'Cronos Testnet',
    nativeCurrency: {
      name: 'TCRO',
      symbol: 'TCRO',
      decimals: 18,
    },
    rpcUrls: [`https://evm-t3.cronos.org`],
    blockExplorerUrls: ['https://testnet.cronoscan.com/'],
  },
  {
    chainId: 10,
    chainName: 'Optimism',
    rpcUrls: [
      INFURA_KEY ? `https://optimism-mainnet.infura.io/v3/${INFURA_KEY}` : '',
      'https://mainnet.optimism.io',
    ],
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://optimistic.etherscan.io'],
  },
  {
    chainId: 69,
    chainName: 'Optimism Kovan',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: [
      INFURA_KEY ? `https://optimism-kovan.infura.io/v3/${INFURA_KEY}` : '',
      'https://kovan.optimism.io',
    ],
    blockExplorerUrls: ['https://kovan-optimistic.etherscan.io'],
  },
  {
    chainId: 42161,
    chainName: 'Arbitrum One',
    rpcUrls: [
      INFURA_KEY ? `https://arbitrum-mainnet.infura.io/v3/${INFURA_KEY}` : '',
      'https://arb1.arbitrum.io/rpc',
    ],
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://arbiscan.io'],
  },
  {
    chainId: 137,
    chainName: 'Polygon Mainnet',
    rpcUrls: [
      INFURA_KEY ? `https://polygon-mainnet.infura.io/v3/${INFURA_KEY}` : '',
      'https://polygon-rpc.com',
    ],
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
    },
    blockExplorerUrls: ['https://polygonscan.com'],
  },
].map(
  (v) =>
    ({
      ...v,
      rpcUrls: v.rpcUrls.filter((url) => !!url),
    } as AddEthereumChainParameter),
);

export const rpcMap: { [chainId: number]: string } = CHAINS.reduce<{
  [chainId: number]: string;
}>((acc, params) => {
  acc[params.chainId] = params.rpcUrls[0];
  return acc;
}, {});

export const getAddChainParameters = (
  chainId: number,
): AddEthereumChainParameter | undefined =>
  CHAINS.find((v) => v.chainId === chainId);
