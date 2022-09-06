import { selectedWallet } from '@site/wallets';

import { Card } from './Card';
import { WalletCard } from './WalletCard';
import { WalletSelect } from './WalletSelect';

export const WalletSelectCard = () => {
  const {
    useConnect,
    useDisconnect,
    useAutoConnectOnce,

    useSelectedWallet,
    useAccount,
    useAccounts,
    useChainId,
    useENSName,
    useENSNames,
    useProvider,
    useIsActivating,
    useIsActive,
  } = selectedWallet;

  return (
    <Card>
      <WalletSelect />
      <WalletCard
        {...{
          name: useSelectedWallet().name,

          connect: useConnect(),
          disconnect: useDisconnect(),
          autoConnectOnce: useAutoConnectOnce(),

          useAccount,
          useAccounts,
          useChainId,
          useENSName,
          useENSNames,
          useProvider,
          useIsActivating,
          useIsActive,
        }}
      />
    </Card>
  );
};
