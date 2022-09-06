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
    <select
      value={chainId}
      onChange={(event) => {
        switchChain?.(Number(event.target.value));
      }}
      style={{
        height: '32px',
        padding: '2px 10px',
        cursor: 'pointer',
      }}
      disabled={switchChain === undefined}
    >
      {chainIds.map((chainId) => (
        <option key={chainId} value={chainId}>
          {CHAINS[chainId]?.name ?? chainId}
        </option>
      ))}
    </select>
  );
};
