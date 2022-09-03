import { metaMask } from '@nextjs/wallets';
import { type WalletName } from '@web3-wallet/react';
import { createContext, useContext, useState } from 'react';

type ContextValue = {
  currentWallet: WalletName;
  switchCurrentWallet: (walletName: WalletName) => void;
};

const Context = createContext<ContextValue>({
  currentWallet: metaMask.name,
  switchCurrentWallet: () => {},
});

export const useCurrentWalletContext = () => {
  return useContext(Context);
};

export const CurrentWalletProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [currentWallet, switchCurrentWallet] = useState<WalletName>(
    metaMask.name,
  );
  return (
    <Context.Provider
      value={{
        currentWallet,
        switchCurrentWallet,
      }}
    >
      {children}
    </Context.Provider>
  );
};
