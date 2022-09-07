import { Select } from '@chakra-ui/react';
import type { Wallet } from '@web3-wallet/react';

export const WalletSelect = ({
  wallets,
  selectedWalletName,
  setSelectedWallet,
}: {
  wallets: Wallet[];
  selectedWalletName: Wallet['name'];
  setSelectedWallet: (walletName: Wallet['name']) => void;
}) => {
  return (
    <Select
      value={selectedWalletName}
      onChange={(event) => {
        setSelectedWallet(event.target.value as Wallet['name']);
      }}
    >
      {wallets.map((wallet) => (
        <option key={wallet.name} value={wallet.name}>
          {wallet.name}
        </option>
      ))}
    </Select>
  );
};
