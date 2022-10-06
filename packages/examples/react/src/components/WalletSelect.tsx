import type { WalletConfig } from '@example-react/wallets';
import type { WalletName } from '@web3-wallet/react';

export const WalletSelect = ({
  walletConfigs,
  currentWalletName,
  switchCurrentWallet,
}: {
  walletConfigs: WalletConfig[];
  currentWalletName: WalletName;
  switchCurrentWallet: (walletName: WalletName) => void;
}) => {
  return (
    <select
      value={currentWalletName}
      onChange={(event) => {
        switchCurrentWallet(event.target.value as WalletName);
      }}
      style={{
        height: '32px',
        padding: '2px 10px',
        cursor: 'pointer',
      }}
    >
      {walletConfigs.map(({ name }) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
  );
};
