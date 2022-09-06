import { useSelectedWallet } from '@example-react/wallets';

import { Card } from './Card';
import { WalletCard } from './WalletCard';
import { WalletSelect } from './WalletSelect';

export const WalletSelectCard = () => {
  const currentWallet = useSelectedWallet();

  return (
    <Card>
      <WalletSelect />
      <WalletCard wallet={currentWallet} />
    </Card>
  );
};
