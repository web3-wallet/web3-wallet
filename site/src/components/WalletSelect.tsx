import { Select } from '@chakra-ui/react';
import type { WalletName } from '@react-web3-wallet/react';
import type { WalletConfig } from '@site/wallets';

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
