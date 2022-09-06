import { Box } from './Box';

export const Status = ({
  isConnecting,
  isConnected,
}: {
  isConnecting: boolean;
  isConnected: boolean;
  error?: Error;
}) => {
  return (
    <Box>
      {isConnecting ? (
        <>🟡 Connecting</>
      ) : isConnected ? (
        <>🟢 Connected</>
      ) : (
        <>⚪️ Disconnected</>
      )}
    </Box>
  );
};
