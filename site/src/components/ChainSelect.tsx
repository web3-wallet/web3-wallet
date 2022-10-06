import { Select } from '@chakra-ui/react';

import { chainConfigs } from '../chains';

export const ChainSelect = ({
  chainId,
  switchChain,
  disabled,
}: {
  chainId: number;
  switchChain: (chainId: number) => void;
  disabled: boolean;
}) => {
  return (
    <Select
      value={chainId}
      onChange={(event) => {
        switchChain(Number(event.target.value));
      }}
      disabled={disabled}
    >
      {chainConfigs.map((chain) => (
        <option key={chain.chainId} value={chain.chainId}>
          {chain.chainName}
        </option>
      ))}
    </Select>
  );
};
