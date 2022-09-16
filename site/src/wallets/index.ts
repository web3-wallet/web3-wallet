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
import { DeFiWallet, icon as defiWalletIcon } from '@web3-wallet/defiwallet';
import { icon as imTokenIcon, ImToken } from '@web3-wallet/imtoken';
import { icon as metaMaskIcon, MetaMask } from '@web3-wallet/metamask';
import { BalancePlugin } from '@web3-wallet/plugin-balance-react';
import { EnsPlugin } from '@web3-wallet/plugin-ens-react';
import { WalletProxy } from '@web3-wallet/react';
import {
  icon as trustWalletIcon,
  TrustWallet,
} from '@web3-wallet/trust-wallet';
import {
  icon as walletConnectIcon,
  WalletConnect,
} from '@web3-wallet/walletconnect';

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
  new WalletConnect({
    providerOptions: {
      rpc: rpcMap,
    },
  }),
  new TrustWallet(),
  new CryptocomDesktopWallet(),
  new BraveWallet(),
  new ImToken(),
];

const plugins = [EnsPlugin.create(), BalancePlugin.create()];

export const walletProxy = new WalletProxy(connectors, {
  plugins,
});

export const allWallets = walletProxy.getWallets();
export const currentWallet = walletProxy.getCurrentWallet();
export const [
  metamask,
  defiWallet,
  coinbaseWallet,
  walletconnect,
  trustWallet,
  desktopWallet,
  braveWallet,
  imToken,
] = allWallets;

export const walletIconMap = {
  [metamask.name]: metaMaskIcon,
  [defiWallet.name]: defiWalletIcon,
  [coinbaseWallet.name]: coinbaseWalletIcon,
  [walletconnect.name]: walletConnectIcon,
  [trustWallet.name]: trustWalletIcon,
  [desktopWallet.name]: desktopWalletIcon,
  [braveWallet.name]: braveWalletIcon,
  [imToken.name]: imTokenIcon,
};
