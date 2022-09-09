import { Button, Flex, useToast } from '@chakra-ui/react';
import type { Wallet } from '@web3-wallet/react';
import { useCallback, useState } from 'react';

import { getAddChainParameters, rpcMap } from '../chains';
import { ChainSelect } from './ChainSelect';

export const ConnectWithSelect = ({
  connect,
  disconnect,
  chainId,
  isConnecting,
  isConnected,
}: {
  disconnect: Wallet['connector']['disconnect'];
  connect: Wallet['connector']['connect'];
  chainId?: number;
  isConnecting: boolean;
  isConnected: boolean;
}) => {
  const chainIds = Object.keys(rpcMap).map((chainId) => Number(chainId));
  const [desiredChainId, setDesiredChainId] = useState<number>(chainId || 1);
  const toast = useToast();

  const switchChain = useCallback(
    (desiredChainId: number) => {
      setDesiredChainId(desiredChainId);
      connect(getAddChainParameters(desiredChainId));
    },
    [connect],
  );

  if (isConnected) {
    return (
      <Flex flexDirection="column" gap={4}>
        <ChainSelect
          chainId={chainId as number}
          switchChain={switchChain}
          chainIds={chainIds}
        />
        <Button
          colorScheme="red"
          onClick={async () => {
            try {
              await disconnect();
            } catch (error) {
              console.warn('connect error: ', error);
            }
          }}
        >
          Disconnect
        </Button>
      </Flex>
    );
  }

  return (
    <Flex flexDirection="column" gap={4}>
      <ChainSelect
        chainId={chainId || 1}
        switchChain={isConnecting ? undefined : switchChain}
        chainIds={chainIds}
      />
      <Button
        colorScheme="blue"
        disabled={isConnecting}
        onClick={async () => {
          try {
            await connect(getAddChainParameters(desiredChainId));
          } catch (e: unknown) {
            toast({
              position: 'top-right',
              status: 'error',
              description: (e as Error).message,
            });
          }
        }}
      >
        Connect
      </Button>
    </Flex>
  );
};
