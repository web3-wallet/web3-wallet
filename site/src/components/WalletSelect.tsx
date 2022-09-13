import { Select } from '@chakra-ui/react';
import type { Wallet } from '@web3-wallet/react';

export const WalletSelect = ({
  wallets,
  currentWalletName,
  switchCurrentWallet,
}: {
  wallets: Wallet[];
  currentWalletName: Wallet['name'];
  switchCurrentWallet: (walletName: Wallet['name']) => void;
}) => {
  return (
    <Select
      value={currentWalletName}
      onChange={(event) => {
        switchCurrentWallet(event.target.value as Wallet['name']);
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
