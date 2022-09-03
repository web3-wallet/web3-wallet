import { useCurrentWallet } from '@site/hooks/useCurrentWallet';

import { Card } from './Card';
import { WalletCard } from './WalletCard';
import { WalletSelect } from './WalletSelect';

export const WalletSelectCard = () => {
  const currentWallet = useCurrentWallet();

  return (
    <Card>
      <WalletSelect />
      <WalletCard wallet={currentWallet} />
    </Card>
  );
};
