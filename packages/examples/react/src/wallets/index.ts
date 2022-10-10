import { rpcMap } from '@example-react/chains';
import { BraveWallet } from '@web3-wallet/brave-wallet';
import { CoinbaseWallet } from '@web3-wallet/coinbase-wallet';
import { CryptocomDesktopWallet } from '@web3-wallet/cryptocom-desktop-wallet';
import { DeFiWallet } from '@web3-wallet/defiwallet';
import { ImToken } from '@web3-wallet/imtoken';
import { MetaMask } from '@web3-wallet/metamask';
import { BalancePlugin } from '@web3-wallet/plugin-balance';
import { EnsPlugin } from '@web3-wallet/plugin-ens';
import type { Connector, WalletName } from '@web3-wallet/react';
import { createCurrentWallet } from '@web3-wallet/react';
import { TrustWallet } from '@web3-wallet/trust-wallet';
import { WalletConnect } from '@web3-wallet/walletconnect';

export const plugins = [EnsPlugin.create(), BalancePlugin.create()];

export type WalletConfig = {
  name: WalletName;
  icon: string;
  connector: Connector;
};

export const walletConfigs: WalletConfig[] = [
  {
    name: MetaMask.walletName,
    icon: MetaMask.walletIcon,
    connector: new MetaMask(),
  },
  {
    name: DeFiWallet.walletName,
    icon: DeFiWallet.walletIcon,
    connector: new DeFiWallet(),
  },
  {
    name: CoinbaseWallet.walletName,
    icon: CoinbaseWallet.walletIcon,
    connector: new CoinbaseWallet({
      providerOptions: {
        appName: '@web3-wallet example',
        scanToConnectOptions: {
          reloadOnDisconnect: false,
          rpcUrl: rpcMap[1],
          chainId: 1,
        },
      },
    }),
  },
  {
    name: WalletConnect.walletName,
    icon: WalletConnect.walletIcon,
    connector: new WalletConnect({
      providerOptions: {
        rpc: rpcMap,
      },
    }),
  },
  {
    name: TrustWallet.walletName,
    icon: TrustWallet.walletIcon,
    connector: new TrustWallet(),
  },
  {
    name: CryptocomDesktopWallet.walletName,
    icon: CryptocomDesktopWallet.walletIcon,
    connector: new CryptocomDesktopWallet(),
  },
  {
    name: BraveWallet.walletName,
    icon: BraveWallet.walletIcon,
    connector: new BraveWallet(),
  },
  {
    name: ImToken.walletName,
    icon: ImToken.walletIcon,
    connector: new ImToken(),
  },
];

export const getWalletConfig = (name: WalletName): WalletConfig => {
  return walletConfigs.find((v) => v.name === name) as WalletConfig;
};

export const currentWallet = createCurrentWallet(
  walletConfigs.map((v) => v.connector),
  {
    plugins,
  },
);
