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
    <select
      value={chainId}
      onChange={(event) => {
        switchChain(Number(event.target.value));
      }}
      style={{
        height: '32px',
        padding: '2px 10px',
        cursor: 'pointer',
      }}
      disabled={disabled}
    >
      {chainConfigs.map((chain) => (
        <option key={chain.chainId} value={chain.chainId}>
          {chain.chainName}
        </option>
      ))}
    </select>
  );
};
