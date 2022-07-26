import { Layout } from '../components/Layout';
import { SolanaWalletCardList } from '../components/SolanaWalletCardList';
import { WalletCardList } from '../components/WalletCardList';
import { WalletCardListContainer } from '../components/WalletCardListContainer';

export default function Home() {
  return (
    <Layout>
      <WalletCardListContainer>
        <WalletCardList />
        <SolanaWalletCardList />
      </WalletCardListContainer>
    </Layout>
  );
}
