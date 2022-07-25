import type { Wallet } from '@web3-wallet/react-solana';
import { useEffect } from 'react';

import { Account } from './Account';
import { Status } from './Status';
import { WalletCardContainer } from './WalletCardContainer';

export type SolanaWalletCardProps = {
  wallet: Wallet;
  name: string;
};

export const SolanaWalletCard = ({
  name,
  wallet: { connector, useAccount, useIsActive, useIsActivating },
}: SolanaWalletCardProps) => {
  const account = useAccount();
  const isActivating = useIsActivating();
  const isActive = useIsActive();

  useEffect(() => {
    connector.connectEagerly?.();
  }, []);

  return (
    <WalletCardContainer>
      <b>{name} </b>
      <div>Category: Solana</div>
      <div>
        Account: <Account account={account} />
      </div>
      <Status isActivating={isActivating} isActive={isActive} />
      {isActive ? (
        <button
          style={{
            height: '32px',
            cursor: 'pointer',
          }}
          onClick={() => {
            connector.deactivate();
          }}
        >
          disconnect
        </button>
      ) : (
        <button
          style={{
            height: '32px',
            cursor: 'pointer',
          }}
          onClick={() => {
            connector.activate();
          }}
        >
          connect
        </button>
      )}
    </WalletCardContainer>
  );
};
