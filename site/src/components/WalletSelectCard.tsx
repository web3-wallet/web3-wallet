import { selectedWallet } from '@site/wallets';

import { Card } from './Card';
import { WalletCard } from './WalletCard';
import { WalletSelect } from './WalletSelect';

export const WalletSelectCard = () => {
  const {
    useActivate,
    useDeactivate,
    useConnectEagerlyOnce,

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

          activate: useActivate(),
          deactivate: useDeactivate(),
          connectEagerlyOnce: useConnectEagerlyOnce(),

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
