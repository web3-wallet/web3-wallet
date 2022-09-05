import { useCurrentWalletContext } from '@site/context';
import { allWallets } from '@site/wallets';
import { useSelectedWallet } from '@web3-wallet/react';

export const useCurrentWallet = () => {
  const selectedWalletName = useCurrentWalletContext().currentWallet;
  return useSelectedWallet(selectedWalletName, allWallets);
};
