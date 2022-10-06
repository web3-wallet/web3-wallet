import { Box } from '@example-react/components/Box';
import { CurrentWalletCard } from '@example-react/components/CurrentWalletCard';

export default function Home() {
  return (
    <Box
      style={{
        marginTop: 50,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <CurrentWalletCard />
    </Box>
  );
}
