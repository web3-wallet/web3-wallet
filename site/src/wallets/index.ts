import { rpcMap } from '@site/chains';
import {
  BraveWallet,
  icon as braveWalletIcon,
} from '@web3-wallet/brave-wallet';
import {
  CoinbaseWallet,
  icon as coinbaseWalletIcon,
} from '@web3-wallet/coinbase-wallet';
import {
  CryptocomDesktopWallet,
  icon as desktopWalletIcon,
} from '@web3-wallet/cryptocom-desktop-wallet';
import { getDeFiWallet, icon as defiWalletIcon } from '@web3-wallet/defiwallet';
import { icon as metaMaskIcon, MetaMask } from '@web3-wallet/metamask';
import { BalancePlugin } from '@web3-wallet/plugin-balance-react';
import { EnsPlugin } from '@web3-wallet/plugin-ens-react';
import { WalletProxy } from '@web3-wallet/react';
import {
  icon as walletConnectIcon,
  WalletConnect,
} from '@web3-wallet/walletconnect';

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
  new WalletConnect({
    providerOptions: {
      rpc: rpcMap,
    },
  }),
  new CryptocomDesktopWallet(),
  new BraveWallet(),
];

const plugins = [EnsPlugin.create(), BalancePlugin.create()];

export const walletProxy = new WalletProxy(connectors, {
  plugins,
});

export const allWallets = walletProxy.getWallets();
export const currentWallet = walletProxy.getCurrentWallet();
export const [
  metamask,
  defiwallet,
  coinbaseWallet,
  walletconnect,
  desktopWallet,
  braveWallet,
] = allWallets;

export const walletIconMap = {
  [metamask.name]: metaMaskIcon,
  [defiwallet.name]: defiWalletIcon,
  [coinbaseWallet.name]: coinbaseWalletIcon,
  [walletconnect.name]: walletConnectIcon,
  [desktopWallet.name]: desktopWalletIcon,
  [braveWallet.name]: braveWalletIcon,
};
