import { Box } from '@example-react/components/Box';
import { Layout } from '@example-react/components/Layout';
import { WalletSelectCard } from '@example-react/components/WalletSelectCard';

export default function Home() {
  return (
    <Layout>
      <Box
        style={{
          marginTop: 50,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <WalletSelectCard />
      </Box>
    </Layout>
  );
}
