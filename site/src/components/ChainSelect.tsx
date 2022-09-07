import { Select } from '@chakra-ui/react';

import { CHAINS } from '../chains';

export const ChainSelect = ({
  chainId,
  switchChain,
  chainIds,
}: {
  chainId: number;
  switchChain: ((chainId: number) => void) | undefined;
  chainIds: number[];
}) => {
  return (
    <Select
      value={chainId}
      onChange={(event) => {
        switchChain?.(Number(event.target.value));
      }}
      disabled={switchChain === undefined}
    >
      {chainIds.map((chainId) => (
        <option key={chainId} value={chainId}>
          {CHAINS[chainId]?.name ?? chainId}
        </option>
      ))}
    </Select>
  );
};
