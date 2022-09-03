import { Layout } from '@site/components/Layout';
import { WalletCardList } from '@site/components/WalletCardList';
import { WalletCardListContainer } from '@site/components/WalletCardListContainer';

export default function Home() {
  return (
    <Layout>
      <WalletCardListContainer>
        <WalletCardList />
      </WalletCardListContainer>
    </Layout>
  );
}
