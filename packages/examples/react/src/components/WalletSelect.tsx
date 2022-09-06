import type { Wallet, WalletName } from '@web3-wallet/react';

export const WalletSelect = ({
  wallets,
  selectedWalletName,
  setSelectedWallet,
}: {
  wallets: Wallet[];
  selectedWalletName: WalletName;
  setSelectedWallet: (walletName: WalletName) => void;
}) => {
  return (
    <select
      value={selectedWalletName}
      onChange={(event) => {
        setSelectedWallet(event.target.value as WalletName);
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
