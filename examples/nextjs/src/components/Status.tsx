import type { WalletApi } from '@web3-wallet/react';

type Hooks = WalletApi['hooks'];

export function Status({
  isActivating,
  isActive,
}: {
  isActivating: ReturnType<Hooks['useIsActivating']>;
  isActive: ReturnType<Hooks['useIsActive']>;
  error?: Error;
}) {
  return (
    <div>
      {isActivating ? (
        <>🟡 Connecting</>
      ) : isActive ? (
        <>🟢 Connected</>
      ) : (
        <>⚪️ Disconnected</>
      )}
    </div>
  );
}
