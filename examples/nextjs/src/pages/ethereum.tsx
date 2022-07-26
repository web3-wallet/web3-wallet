import { Layout } from '../components/Layout';
import { WalletCardList } from '../components/WalletCardList';
import { WalletCardListContainer } from '../components/WalletCardListContainer';

export default function Home() {
  return (
    <Layout>
      <WalletCardListContainer>
        <WalletCardList />
      </WalletCardListContainer>
    </Layout>
  );
}
