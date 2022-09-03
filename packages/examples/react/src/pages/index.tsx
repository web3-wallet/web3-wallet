import { Layout } from '@example-react/components/Layout';
import { WalletCardList } from '@example-react/components/WalletCardList';
import { WalletCardListContainer } from '@example-react/components/WalletCardListContainer';

export default function Home() {
  return (
    <Layout>
      <WalletCardListContainer>
        <WalletCardList />
      </WalletCardListContainer>
    </Layout>
  );
}
