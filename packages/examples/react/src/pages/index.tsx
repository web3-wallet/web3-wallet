import { Box } from '@example-react/components/Box';
import { Layout } from '@example-react/components/Layout';
import { WalletSelectCard } from '@example-react/components/WalletSelectCard';

export default function Home() {
  return (
    <Layout>
      <Box
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <WalletSelectCard />
      </Box>
    </Layout>
  );
}
