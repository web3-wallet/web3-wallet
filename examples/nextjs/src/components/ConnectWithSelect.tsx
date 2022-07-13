import type { WalletApi } from '@web3-wallet/react';
import { useCallback, useState } from 'react';

import { CHAINS, getAddChainParameters, URLS } from '../chains';
import { ChainSelect } from './ChainSelect';

type Hooks = WalletApi['hooks'];

export const ConnectWithSelect = ({
  connector,
  chainId,
  isActivating,
  isActive,
}: {
  connector: WalletApi['connector'];
  chainId: ReturnType<Hooks['useChainId']>;
  isActivating: ReturnType<Hooks['useIsActivating']>;
  isActive: ReturnType<Hooks['useIsActive']>;
}) => {
  const hashConnector = connector;
  const displayDefault = !hashConnector;
  const chainIds = (
    hashConnector ? Object.keys(URLS) : Object.keys(CHAINS)
  ).map((chainId) => Number(chainId));

  const [desiredChainId, setDesiredChainId] = useState<number>(
    hashConnector ? 1 : -1,
  );

  const switchChain = useCallback(
    (desiredChainId: number) => {
      setDesiredChainId(desiredChainId);

      connector.activate(
        desiredChainId === -1
          ? undefined
          : getAddChainParameters(desiredChainId),
      );
    },
    [connector, chainId],
  );

  if (isActive) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <ChainSelect
          chainId={desiredChainId === -1 ? -1 : chainId}
          switchChain={switchChain}
          displayDefault={displayDefault}
          chainIds={chainIds}
        />
        <button
          style={{
            height: '32px',
            cursor: 'pointer',
          }}
          onClick={async () => {
            if (connector?.deactivate) {
              try {
                await connector.deactivate();
              } catch (error) {
                console.warn('activate error: ', error);
              }
            } else {
              void connector.resetState();
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
        displayDefault={displayDefault}
        chainIds={chainIds}
      />
      <button
        style={{
          height: '32px',
          cursor: 'pointer',
        }}
        onClick={() => {
          if (isActivating) return;
          connector.activate(
            desiredChainId === -1
              ? undefined
              : getAddChainParameters(desiredChainId),
          );
        }}
        disabled={isActivating}
      >
        Connect
      </button>
    </div>
  );
};
