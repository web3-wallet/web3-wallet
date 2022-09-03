import { CHAINS } from '../chains';

export const Chain = ({ chainId }: { chainId?: number }) => {
  if (chainId === undefined) return null;

  const name = chainId ? CHAINS[chainId]?.name : undefined;

  if (name) {
    return (
      <div>
        Chain:{' '}
        <b>
          {name} ({chainId})
        </b>
      </div>
    );
  }

  return (
    <div>
      Chain Id: <b>{chainId}</b>
    </div>
  );
};
