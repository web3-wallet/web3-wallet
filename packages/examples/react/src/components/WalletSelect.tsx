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
    <select
      value={selectedWalletName}
      onChange={(event) => {
        setSelectedWallet(event.target.value as Wallet['name']);
      }}
      style={{
        height: '32px',
        padding: '2px 10px',
        cursor: 'pointer',
      }}
    >
      {wallets.map((wallet) => (
        <option key={wallet.name} value={wallet.name}>
          {wallet.name}
        </option>
      ))}
    </select>
  );
};
