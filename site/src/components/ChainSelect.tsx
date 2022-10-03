import { Select } from '@chakra-ui/react';

import { chainConfigs } from '../chains';

export const ChainSelect = ({
  chainId,
  switchChain,
}: {
  chainId: number;
  switchChain: ((chainId: number) => void) | undefined;
}) => {
  return (
    <Select
      value={chainId}
      onChange={(event) => {
        switchChain?.(Number(event.target.value));
      }}
      disabled={switchChain === undefined}
    >
      {chainConfigs.map((chain) => (
        <option key={chain.chainId} value={chain.chainId}>
          {chain.chainName}
        </option>
      ))}
    </Select>
  );
};
