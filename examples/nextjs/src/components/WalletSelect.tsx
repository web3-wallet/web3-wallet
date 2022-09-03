import { useCurrentWalletContext } from '@nextjs/context';
import * as walletMap from '@nextjs/wallets';
import type { Wallet, WalletName } from '@web3-wallet/react';

const wallets: Wallet[] = Object.values(walletMap);

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
      {wallets.map((wallet) => (
        <option key={wallet.name} value={wallet.name}>
          {wallet.name}
        </option>
      ))}
    </select>
  );
};
