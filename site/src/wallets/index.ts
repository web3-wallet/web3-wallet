import { rpcMap } from '@site/chains';
import { CoinbaseWallet } from '@web3-wallet/coinbase-wallet';
import { CryptocomDesktopWallet } from '@web3-wallet/cryptocom-desktop-wallet';
import { getDeFiWallet } from '@web3-wallet/defiwallet';
import { MetaMask } from '@web3-wallet/metamask';
import { ConnectionStatusPlugin } from '@web3-wallet/plugin-connection-status-react';
import { WalletProxy } from '@web3-wallet/react';
import { WalletConnect } from '@web3-wallet/walletconnect';

const connectors = [
  new MetaMask(),
  getDeFiWallet({
    extension: {
      chainType: 'eth',
      appName: '@web3-wallet example',
      chainId: 1,
      rpcUrls: {},
    },
  }),
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

const plugins = [ConnectionStatusPlugin.createPlugin()];

export const walletProxy = new WalletProxy(connectors, {
  plugins,
});

export const allWallets = walletProxy.getWallets();
export const currentWallet = walletProxy.getCurrentWallet();
export const metamask = walletProxy.getWallet(connectors[0].name);
export const defiwallet = walletProxy.getWallet(connectors[1].name);
export const coinbaseWallet = walletProxy.getWallet(connectors[2].name);
export const desktopWallet = walletProxy.getWallet(connectors[3].name);
export const walletconnect = walletProxy.getWallet(connectors[4].name);
