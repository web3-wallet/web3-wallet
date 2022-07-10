import type { WalletApi } from '@vvswallet/react';

type Hooks = WalletApi['hooks'];

export function Status({
  isActivating,
  isActive,
  error,
}: {
  isActivating: ReturnType<Hooks['useIsActivating']>;
  isActive: ReturnType<Hooks['useIsActive']>;
  error?: Error;
}) {
  return (
    <div>
      {error ? (
        <>
          🔴 {error.name ?? 'Error'}
          {error.message ? `: ${error.message}` : null}
        </>
      ) : isActivating ? (
        <>🟡 Connecting</>
      ) : isActive ? (
        <>🟢 Connected</>
      ) : (
        <>⚪️ Disconnected</>
      )}
    </div>
  );
}
