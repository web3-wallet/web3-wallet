import { Box } from '@site/components/Box';
import { Layout } from '@site/components/Layout';
import { WalletSelectCard } from '@site/components/WalletSelectCard';

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
