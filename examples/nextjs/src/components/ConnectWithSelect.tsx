import type { WalletApi } from '@web3-wallet/react';
import { useCallback, useState } from 'react';

import { CHAINS, getAddChainParameters, URLS } from '../chains';

type Hooks = WalletApi['hooks'];

function ChainSelect({
  chainId,
  switchChain,
  displayDefault,
  chainIds,
}: {
  chainId: number;
  switchChain: (chainId: number) => void | undefined;
  displayDefault: boolean;
  chainIds: number[];
}) {
  return (
    <select
      value={chainId}
      onChange={(event) => {
        switchChain?.(Number(event.target.value));
      }}
      disabled={switchChain === undefined}
    >
      {displayDefault ? <option value={-1}>Default Chain</option> : null}
      {chainIds.map((chainId) => (
        <option key={chainId} value={chainId}>
          {CHAINS[chainId]?.name ?? chainId}
        </option>
      ))}
    </select>
  );
}

export function ConnectWithSelect({
  connector,
  chainId,
  isActivating,
  isActive,
}: {
  connector: WalletApi['connector'];
  chainId: ReturnType<Hooks['useChainId']>;
  isActivating: ReturnType<Hooks['useIsActivating']>;
  isActive: ReturnType<Hooks['useIsActive']>;
}) {
  const isNetwork = connector;
  const displayDefault = !isNetwork;
  const chainIds = (isNetwork ? Object.keys(URLS) : Object.keys(CHAINS)).map(
    (chainId) => Number(chainId),
  );

  const [desiredChainId, setDesiredChainId] = useState<number>(
    isNetwork ? 1 : -1,
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
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <ChainSelect
          chainId={desiredChainId === -1 ? -1 : chainId}
          switchChain={switchChain}
          displayDefault={displayDefault}
          chainIds={chainIds}
        />
        <div style={{ marginBottom: '1rem' }} />
        <button
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
  } else {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <ChainSelect
          chainId={desiredChainId}
          switchChain={isActivating ? undefined : switchChain}
          displayDefault={displayDefault}
          chainIds={chainIds}
        />
        <div style={{ marginBottom: '1rem' }} />
        <button
          onClick={
            isActivating
              ? undefined
              : () =>
                  connector.activate(
                    desiredChainId === -1
                      ? undefined
                      : getAddChainParameters(desiredChainId),
                  )
          }
          disabled={isActivating}
        >
          Connect
        </button>
      </div>
    );
  }
}
