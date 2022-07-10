import MetaMaskCard from '../components/connectorCards/MetaMaskCard';

export default function Home() {
  return (
    <>
      <div
        style={{ display: 'flex', flexFlow: 'wrap', fontFamily: 'sans-serif' }}
      >
        <MetaMaskCard />
      </div>
    </>
  );
}
