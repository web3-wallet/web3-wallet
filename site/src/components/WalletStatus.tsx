import { Box } from '@chakra-ui/react';

export const WalletStatus = ({
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
