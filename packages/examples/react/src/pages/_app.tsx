import { CurrentWalletProvider } from '@example-react/context';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CurrentWalletProvider>
      <Component {...pageProps} />
    </CurrentWalletProvider>
  );
}

export default MyApp;
