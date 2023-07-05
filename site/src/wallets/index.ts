import { rpcMap } from '@site/chains';
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
import { XDEFI } from '@web3-wallet/xdefi';

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
        projectId: 'f30b7f87c783bab76df3a66876f2a67f',
        rpcMap,
        /**
         * @note Chains that your app intents to use and the peer MUST support.
         *  If the peer does not support these chains, the connection will be rejected.
         * @default [1]
         * @example [1, 3, 4, 5, 42]
         */
        chains: [1],
        /**
         * @note Optional chains that your app MAY attempt to use and the peer MAY support.
         *  If the peer does not support these chains, the connection will still be established.
         * @default [1]
         * @example [1, 3, 4, 5, 42]
         */
        optionalChains: [25],
        showQrModal: true,
        optionalMethods: [
          'eth_signTypedData',
          'eth_signTypedData_v4',
          'eth_sign',
        ],
        qrModalOptions: {
          // desktopWallets: undefined,
          // enableExplorer: true,
          // explorerExcludedWalletIds: undefined,
          // explorerRecommendedWalletIds: undefined,
          // mobileWallets: undefined,
          // privacyPolicyUrl: undefined,
          // termsOfServiceUrl: undefined,
          // themeVariables: undefined,
          // walletImages: undefined,
          // 'dark' | 'light'
          themeMode: 'dark',
        },
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
  {
    walletName: XDEFI.walletName,
    icon: '/web3-wallet/images/xdefi.jpg',
    connector: new XDEFI(),
  },
];

export const getWalletConfig = (walletName: WalletName): WalletConfig => {
  return walletConfigs.find((v) => v.walletName === walletName) as WalletConfig;
};

export const currentWallet = createCurrentWallet(
  walletConfigs.map((v) => v.connector),
);
