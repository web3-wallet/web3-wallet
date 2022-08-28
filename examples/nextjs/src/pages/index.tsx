import { Layout } from '@nextjs/components/Layout';
import { WalletCardList } from '@nextjs/components/WalletCardList';
import { WalletCardListContainer } from '@nextjs/components/WalletCardListContainer';

export default function Home() {
  return (
    <Layout>
      <WalletCardListContainer>
        <WalletCardList />
      </WalletCardListContainer>
    </Layout>
  );
}
