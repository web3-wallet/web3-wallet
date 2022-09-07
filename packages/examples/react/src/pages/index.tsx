import { Box } from '@example-react/components/Box';
import { WalletSelectCard } from '@example-react/components/WalletSelectCard';

export default function Home() {
  return (
    <Box
      style={{
        marginTop: 50,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <WalletSelectCard />
    </Box>
  );
}
