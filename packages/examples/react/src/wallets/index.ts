import { rpcMap } from '@example-react/chains';
import { BraveWallet } from '@web3-wallet/brave-wallet';
import { CoinbaseWallet } from '@web3-wallet/coinbase-wallet';
import { CryptocomDesktopWallet } from '@web3-wallet/cryptocom-desktop-wallet';
import { DeFiWallet } from '@web3-wallet/defiwallet';
import { ImToken } from '@web3-wallet/imtoken';
import { MetaMask } from '@web3-wallet/metamask';
import type { Connector, WalletName } from '@web3-wallet/react';
import { createCurrentWallet } from '@web3-wallet/react';
import { TrustWallet } from '@web3-wallet/trust-wallet';
import { WalletConnect } from '@web3-wallet/walletconnect';

export type WalletConfig = {
  walletName: WalletName;
  icon: string;
  connector: Connector;
};

export const walletConfigs: WalletConfig[] = [
  {
    walletName: MetaMask.walletName,
    icon: MetaMask.walletIcon,
    connector: new MetaMask(),
  },
  {
    walletName: DeFiWallet.walletName,
    icon: DeFiWallet.walletIcon,
    connector: new DeFiWallet(),
  },
  {
    walletName: CoinbaseWallet.walletName,
    icon: CoinbaseWallet.walletIcon,
    connector: new CoinbaseWallet({
      providerOptions: {
        appName: '@web3-wallet example',
        scanToConnectOptions: {
          rpcUrl: rpcMap[1],
          chainId: 1,
        },
      },
    }),
  },
  {
    walletName: WalletConnect.walletName,
    icon: WalletConnect.walletIcon,
    connector: new WalletConnect({
      providerOptions: {
        rpc: rpcMap,
      },
    }),
  },
  {
    walletName: TrustWallet.walletName,
    icon: TrustWallet.walletIcon,
    connector: new TrustWallet(),
  },
  {
    walletName: CryptocomDesktopWallet.walletName,
    icon: CryptocomDesktopWallet.walletIcon,
    connector: new CryptocomDesktopWallet(),
  },
  {
    walletName: BraveWallet.walletName,
    icon: BraveWallet.walletIcon,
    connector: new BraveWallet(),
  },
  {
    walletName: ImToken.walletName,
    icon: ImToken.walletIcon,
    connector: new ImToken(),
  },
];

export const getWalletConfig = (walletName: WalletName): WalletConfig => {
  return walletConfigs.find((v) => v.walletName === walletName) as WalletConfig;
};

export const currentWallet = createCurrentWallet(
  walletConfigs.map((v) => v.connector),
);
