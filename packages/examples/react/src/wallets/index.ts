import { rpcMap } from '@example-react/chains';
import { CoinbaseWallet } from '@web3-wallet/coinbase-wallet';
import { CryptocomDesktopWallet } from '@web3-wallet/cryptocom-desktop-wallet';
import { DeFiWallet } from '@web3-wallet/defiwallet';
import { MetaMask } from '@web3-wallet/metamask';
import { BalancePlugin } from '@web3-wallet/plugin-balance-react';
import { EnsPlugin } from '@web3-wallet/plugin-ens-react';
import { WalletProxy } from '@web3-wallet/react';
import { WalletConnect } from '@web3-wallet/walletconnect';

const connectors = [
  new MetaMask(),
  new DeFiWallet(),
  new CoinbaseWallet({
    providerOptions: {
      appName: '@web3-wallet example',
      reloadOnDisconnect: false,
      url: rpcMap[1],
    },
  }),
  new CryptocomDesktopWallet(),
  new WalletConnect({
    providerOptions: {
      rpc: rpcMap,
    },
  }),
];

const plugins = [BalancePlugin.create(), EnsPlugin.create()];

export const walletProxy = new WalletProxy(connectors, {
  plugins,
});

export const allWallets = walletProxy.getWallets();
export const currentWallet = walletProxy.getCurrentWallet();
export const [
  metamask,
  defiWallet,
  coinbaseWallet,
  desktopWallet,
  walletconnect,
] = allWallets;
