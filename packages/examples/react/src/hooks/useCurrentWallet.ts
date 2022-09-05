import { useCurrentWalletContext } from '@example-react/context';
import { allWallets } from '@example-react/wallets';
import { useSelectedWallet } from '@web3-wallet/react';

export const useCurrentWallet = () => {
  const selectedWalletName = useCurrentWalletContext().currentWallet;
  return useSelectedWallet(selectedWalletName, allWallets);
};
