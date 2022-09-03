import { useCurrentWalletContext } from '@example-react/context';
import * as walletMap from '@example-react/wallets';
import { type Wallet, useSelectedWallet } from '@web3-wallet/react';

const wallets: Wallet[] = Object.values(walletMap);

export const useCurrentWallet = () => {
  const selectedWalletName = useCurrentWalletContext().currentWallet;
  return useSelectedWallet(selectedWalletName, wallets);
};
