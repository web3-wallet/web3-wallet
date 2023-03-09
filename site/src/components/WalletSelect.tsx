import { Select } from '@chakra-ui/react';
import type { WalletConfig } from '@site/wallets';
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
    <Select
      value={currentWalletName}
      onChange={(event) => {
        switchCurrentWallet(event.target.value as WalletName);
      }}
    >
      {walletConfigs.map(({ walletName }) => (
        <option key={walletName} value={walletName}>
          {walletName}
        </option>
      ))}
    </Select>
  );
};
