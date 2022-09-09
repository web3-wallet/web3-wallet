import type { Wallet } from '@web3-wallet/react';
import { useCallback, useState } from 'react';

import { getAddChainParameters, rpcMap } from '../chains';
import { Box } from './Box';
import { ChainSelect } from './ChainSelect';

export const ConnectWithSelect = ({
  connect,
  disconnect,
  chainId,
  isConnecting,
  isConnected,
}: {
  disconnect: Wallet['disconnect'];
  connect: Wallet['connect'];
  chainId?: number;
  isConnecting: boolean;
  isConnected: boolean;
}) => {
  const chainIds = Object.keys(rpcMap).map((chainId) => Number(chainId));
  const [desiredChainId, setDesiredChainId] = useState<number>(chainId || 1);

  const switchChain = useCallback(
    (desiredChainId: number) => {
      setDesiredChainId(desiredChainId);
      connect(getAddChainParameters(desiredChainId));
    },
    [connect],
  );

  if (isConnected) {
    return (
      <Box style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <ChainSelect
          chainId={desiredChainId}
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
      </Box>
    );
  }

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <ChainSelect
        chainId={desiredChainId}
        switchChain={isConnecting ? undefined : switchChain}
        chainIds={chainIds}
      />
      <button
        style={{
          height: '32px',
          cursor: 'pointer',
        }}
        disabled={isConnecting}
        onClick={() => {
          if (isConnecting) return;
          connect(getAddChainParameters(desiredChainId));
        }}
      >
        Connect
      </button>
    </Box>
  );
};
