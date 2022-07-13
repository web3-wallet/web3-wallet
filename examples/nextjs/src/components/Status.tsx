export const Status = ({
  isActivating,
  isActive,
}: {
  isActivating: boolean;
  isActive: boolean;
  error?: Error;
}) => {
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
};
