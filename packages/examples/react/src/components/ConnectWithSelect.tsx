import type { Wallet } from '@web3-wallet/react';
import { useCallback, useState } from 'react';

import { getAddChainParameters, rpcMap } from '../chains';
import { ChainSelect } from './ChainSelect';

export const ConnectWithSelect = ({
  connect,
  disconnect,
  chainId,
  isActivating,
  isActive,
}: {
  disconnect: Wallet['connector']['disconnect'];
  connect: Wallet['connector']['connect'];
  chainId?: number;
  isActivating: boolean;
  isActive: boolean;
}) => {
  const chainIds = Object.keys(rpcMap).map((chainId) => Number(chainId));
  const [desiredChainId, setDesiredChainId] = useState<number>(1);

  const switchChain = useCallback(
    (desiredChainId: number) => {
      setDesiredChainId(desiredChainId);
      connect(getAddChainParameters(desiredChainId));
    },
    [connect],
  );

  if (isActive) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <ChainSelect
          chainId={desiredChainId === -1 ? -1 : chainId || 1}
          switchChain={switchChain}
          chainIds={chainIds}
        />
        <button
          style={{
            height: '32px',
            cursor: 'pointer',
          }}
          onClick={async () => {
            try {
              await disconnect();
            } catch (error) {
              console.warn('connect error: ', error);
            }
          }}
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <ChainSelect
        chainId={desiredChainId}
        switchChain={isActivating ? undefined : switchChain}
        chainIds={chainIds}
      />
      <button
        style={{
          height: '32px',
          cursor: 'pointer',
        }}
        disabled={isActivating}
        onClick={() => {
          if (isActivating) return;
          connect(
            desiredChainId === -1
              ? undefined
              : getAddChainParameters(desiredChainId),
          );
        }}
      >
        Connect
      </button>
    </div>
  );
};
