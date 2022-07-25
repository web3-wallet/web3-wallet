import { createWallet, Wallet } from '@web3-wallet/react-solana';
import { GlowConnector } from '@web3-wallet/solana-glow';
import { PhantomConnector } from '@web3-wallet/solana-phantom';

const phantom = createWallet<PhantomConnector>(
  (actions) => new PhantomConnector(actions),
);
const glow = createWallet<GlowConnector>(
  (actions) => new GlowConnector(actions),
);

const wallets = [
  {
    wallet: phantom,
    name: 'Phantom',
  },
  {
    wallet: glow,
    name: 'Glow',
  },
];

const WalletCard = ({
  name,
  connector,
  useAccount,
}: Wallet & { name: string }) => {
  const account = useAccount();
  return (
    <div
      style={{
        display: 'flex',
        gap: '10px',
      }}
    >
      <div>{name}</div>
      <button
        onClick={() => {
          connector.activate();
        }}
      >
        connect, ({account})
      </button>
      <button
        onClick={() => {
          connector.deactivate();
        }}
      >
        disconnect
      </button>
    </div>
  );
};

export default function Home() {
  return (
    <main
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      {wallets.map(({ name, wallet }) => (
        <WalletCard name={name} {...wallet} />
      ))}
    </main>
  );
}
