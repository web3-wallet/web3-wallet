# Get Started

Culpa proident ipsum proident velit cillum veniam excepteur proident eiusmod minim. Aliqua occaecat elit adipisicing et aute ad incididunt tempor nisi commodo. Cillum tempor labore qui Lorem non cillum. Esse nostrud sit reprehenderit dolor sit quis ex laborum reprehenderit ex voluptate nisi ea in. Eu elit ad fugiat anim occaecat culpa reprehenderit sint dolor id in consectetur elit.

## About

Lorem Lorem mollit mollit ad eiusmod fugiat enim ad sint nisi eiusmod in ex. Ea nostrud laboris sunt deserunt veniam voluptate ea enim ut anim deserunt dolor. Commodo tempor culpa pariatur consequat dolor amet in veniam fugiat anim fugiat. Ea occaecat ex commodo ea sit est commodo mollit do id reprehenderit consequat reprehenderit irure. `hello world`

> Lorem dolor officia enim tempor proident. Culpa labore sit velit nisi voluptate officia dolor aliqua nulla culpa in culpa ad magna. Do amet incididunt id ad eu velit. Mollit consequat voluptate aliquip laborum ea enim. Esse labore Lorem id proident commodo eu eiusmod. Irure culpa Lorem dolore cillum duis dolor est nostrud anim pariatur ea excepteur.

```tsx
import { rpcMap } from '@site/chains';
import { CoinbaseWallet } from '@web3-wallet/coinbase-wallet';
import { CryptocomDesktopWallet } from '@web3-wallet/cryptocom-desktop-wallet';
import { getDeFiWallet } from '@web3-wallet/defiwallet';
import { MetaMask } from '@web3-wallet/metamask';
import { DefiWallet } from '@web3-wallet/defiwallet';
import { WalletManager } from '@web3-wallet/react';
import { WalletConnect } from '@web3-wallet/walletconnect';
import { BalancePlugin } from '@web3-wallet/plugin-balance';
import { EnsPlugin } from '@web3-wallet/plugin-ens';

// setup wallets and plugins
// ===========================

const connectors = [
  new MetaMask(),
  new DefiWallet(),
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

export const walletProxy = new WalletManager(connectors, {
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

// use wallets and plugins in UI components
// ========================================

const {
  useName,
  switchCurrentWallet,

  usePlugin,

  connect,
  autoConnect,
  disconnect,

  useIsConnecting,
  useIsConnected,

  useAccounts,
  useChainId,
  useProvider,
} = currentWallet;

export const WalletSelectCard = () => {
  const walletName = useName();
  const isConnecting = useIsConnecting();
  const isConnected = useIsConnected();

  const chainId = useChainId();
  const accounts = useAccounts();
  const provider = useProvider();

  const { useBalances } = usePlugin<BalancePlugin.Api>(
    BalancePlugin.name,
  ).hooks;
  const { useEnsNames } = usePlugin<EnsPlugin.Api>(EnsPlugin.name).hooks;

  const balances = useBalances();
  const ensNames = useEnsNames();

  useEffect(() => {
    autoConnect();
    /**
     * autoConnect when wallet changed
     */
  }, [walletName]);

  return (
    <Card>
      <WalletSelect
        wallets={allWallets}
        currentWalletName={walletName}
        switchCurrentWallet={switchCurrentWallet}
      />
      <WalletCard>
        <Text fontWeight="bold">{walletName}</Text>
        <WalletStatus isConnecting={isConnecting} isConnected={isConnected} />
        <Chain chainId={chainId} />
        <Accounts
          accounts={accounts}
          provider={provider}
          balances={balances}
          ensNames={ensNames}
        />
        <ConnectWithSelect
          connect={connect}
          disconnect={disconnect}
          chainId={chainId}
          isConnecting={isConnecting}
          isConnected={isConnected}
        />
      </WalletCard>
    </Card>
  );
};
```

### Background

Lorem Lorem mollit mollit ad eiusmod fugiat enim ad sint nisi eiusmod in ex. Ea nostrud laboris sunt deserunt veniam voluptate ea enim ut anim deserunt dolor. Commodo tempor culpa pariatur consequat dolor amet in veniam fugiat anim fugiat. Ea occaecat ex commodo ea sit est commodo mollit do id reprehenderit consequat reprehenderit irure.
Lorem Lorem mollit mollit ad eiusmod fugiat enim ad sint nisi eiusmod in ex. Ea nostrud laboris sunt deserunt veniam voluptate ea enim ut anim deserunt dolor. Commodo tempor culpa pariatur consequat dolor amet in veniam fugiat anim fugiat. Ea occaecat ex commodo ea sit est commodo mollit do id reprehenderit consequat reprehenderit irure.
Lorem Lorem mollit mollit ad eiusmod fugiat enim ad sint nisi eiusmod in ex. Ea nostrud laboris sunt deserunt veniam voluptate ea enim ut anim deserunt dolor. Commodo tempor culpa pariatur consequat dolor amet in veniam fugiat anim fugiat. Ea occaecat ex commodo ea sit est commodo mollit do id reprehenderit consequat reprehenderit irure.
Lorem Lorem mollit mollit ad eiusmod fugiat enim ad sint nisi eiusmod in ex. Ea nostrud laboris sunt deserunt veniam voluptate ea enim ut anim deserunt dolor. Commodo tempor culpa pariatur consequat dolor amet in veniam fugiat anim fugiat. Ea occaecat ex commodo ea sit est commodo mollit do id reprehenderit consequat reprehenderit irure.
Lorem Lorem mollit mollit ad eiusmod fugiat enim ad sint nisi eiusmod in ex. Ea nostrud laboris sunt deserunt veniam voluptate ea enim ut anim deserunt dolor. Commodo tempor culpa pariatur consequat dolor amet in veniam fugiat anim fugiat. Ea occaecat ex commodo ea sit est commodo mollit do id reprehenderit consequat reprehenderit irure.

## How to use

Lorem Lorem mollit mollit ad eiusmod fugiat enim ad sint nisi eiusmod in ex. Ea nostrud laboris sunt deserunt veniam voluptate ea enim ut anim deserunt dolor. Commodo tempor culpa pariatur consequat dolor amet in veniam fugiat anim fugiat. Ea occaecat ex commodo ea sit est commodo mollit do id reprehenderit consequat reprehenderit irure.

Duis ex veniam velit exercitation quis consequat occaecat nisi velit enim officia. Commodo nulla sint et Lorem consequat cupidatat mollit minim eu sit. Eu tempor veniam adipisicing proident culpa excepteur. Irure dolor eu anim exercitation labore do commodo exercitation magna irure velit tempor. Cillum eu eiusmod laborum ea adipisicing quis ipsum tempor incididunt elit Lorem non.

## When to use

Duis ex veniam velit exercitation quis consequat occaecat nisi velit enim officia. Commodo nulla sint et Lorem consequat cupidatat mollit minim eu sit. Eu tempor veniam adipisicing proident culpa excepteur. Irure dolor eu anim exercitation labore do commodo exercitation magna irure velit tempor. Cillum eu eiusmod laborum ea adipisicing quis ipsum tempor incididunt elit Lorem non.

## Go deep

Lorem Lorem mollit mollit ad eiusmod fugiat enim ad sint nisi eiusmod in ex. Ea nostrud laboris sunt deserunt veniam voluptate ea enim ut anim deserunt dolor. Commodo tempor culpa pariatur consequat dolor amet in veniam fugiat anim fugiat. Ea occaecat ex commodo ea sit est commodo mollit do id reprehenderit consequat reprehenderit irure.

Duis ex veniam velit exercitation quis consequat occaecat nisi velit enim officia. Commodo nulla sint et Lorem consequat cupidatat mollit minim eu sit. Eu tempor veniam adipisicing proident culpa excepteur. Irure dolor eu anim exercitation labore do commodo exercitation magna irure velit tempor. Cillum eu eiusmod laborum ea adipisicing quis ipsum tempor incididunt elit Lorem non.
