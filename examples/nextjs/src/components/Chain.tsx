import type { WalletApi } from '@web3-wallet/react';

import { CHAINS } from '../chains';

export function Chain({
  chainId,
}: {
  chainId: ReturnType<WalletApi['hooks']['useChainId']>;
}) {
  if (chainId === undefined) return null;

  const name = chainId ? CHAINS[chainId]?.name : undefined;

  if (name) {
    return (
      <div>
        Chain:{' '}
        <b>
          {name} ({chainId})
        </b>
      </div>
    );
  }

  return (
    <div>
      Chain Id: <b>{chainId}</b>
    </div>
  );
}
