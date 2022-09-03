import { useCurrentWalletContext } from '@site/context';
import * as walletMap from '@site/wallets';
import { type Wallet, useSelectedWallet } from '@web3-wallet/react';

const wallets: Wallet[] = Object.values(walletMap);

export const useCurrentWallet = () => {
  const selectedWalletName = useCurrentWalletContext().currentWallet;
  return useSelectedWallet(selectedWalletName, wallets);
};
