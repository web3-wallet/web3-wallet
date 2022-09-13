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
    <select
      value={currentWalletName}
      onChange={(event) => {
        switchCurrentWallet(event.target.value as Wallet['name']);
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
