import { getChainConfigs } from '../chains';
import { Box } from './Box';

export const Chain = ({ chainId }: { chainId?: number }) => {
  if (chainId === undefined) return null;

  const name = chainId ? getChainConfigs(chainId)?.chainName : undefined;

  if (name) {
    return (
      <Box>
        <span style={{ marginRight: 10 }}>Chain:</span>
        <b>
          {name} ({chainId})
        </b>
      </Box>
    );
  }

  return (
    <Box>
      <span style={{ marginRight: 10 }}>Chain:</span>
      <b>{chainId}</b>
    </Box>
  );
};
