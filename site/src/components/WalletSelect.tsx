import { useCurrentWalletContext } from '@site/context';
import { allWallets } from '@site/wallets';
import type { WalletName } from '@web3-wallet/react';

export const WalletSelect = () => {
  const { currentWallet, switchCurrentWallet } = useCurrentWalletContext();
  return (
    <select
      value={currentWallet}
      onChange={(event) => {
        switchCurrentWallet(event.target.value as WalletName);
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
