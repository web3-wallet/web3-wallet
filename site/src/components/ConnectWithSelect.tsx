import type { Wallet } from '@web3-wallet/react';
import { useCallback, useState } from 'react';

import { getAddChainParameters, rpcMap } from '../chains';
import { ChainSelect } from './ChainSelect';

export const ConnectWithSelect = ({
  activate,
  deactivate,
  chainId,
  isActivating,
  isActive,
}: {
  deactivate: Wallet['connector']['deactivate'];
  activate: Wallet['connector']['activate'];
  chainId?: number;
  isActivating: boolean;
  isActive: boolean;
}) => {
  const chainIds = Object.keys(rpcMap).map((chainId) => Number(chainId));
  const [desiredChainId, setDesiredChainId] = useState<number>(1);

  const switchChain = useCallback(
    (desiredChainId: number) => {
      setDesiredChainId(desiredChainId);
      activate(getAddChainParameters(desiredChainId));
    },
    [activate],
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
              await deactivate();
            } catch (error) {
              console.warn('activate error: ', error);
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
          activate(
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
