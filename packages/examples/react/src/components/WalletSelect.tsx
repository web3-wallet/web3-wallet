import { allWallets } from '@example-react/wallets';
import type { WalletName } from '@web3-wallet/react';

export const WalletSelect = ({
  selectedWalletName,
  setSelectedWallet,
}: {
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
      {allWallets.map((wallet) => (
        <option key={wallet.name} value={wallet.name}>
          {wallet.name}
        </option>
      ))}
    </select>
  );
};
