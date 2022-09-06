export const Status = ({
  isConnecting,
  isConnected,
}: {
  isConnecting: boolean;
  isConnected: boolean;
  error?: Error;
}) => {
  return (
    <div>
      {isConnecting ? (
        <>🟡 Connecting</>
      ) : isConnected ? (
        <>🟢 Connected</>
      ) : (
        <>⚪️ Disconnected</>
      )}
    </div>
  );
};
