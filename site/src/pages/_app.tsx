import { ChakraProvider } from '@chakra-ui/react';
import { VConsole } from '@site/components/VConsole';
import { theme } from '@site/theme';
import { Web3WalletQueryClientProvider } from '@web3-wallet/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Web3 Wallet</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </Head>
      <VConsole />
      <Web3WalletQueryClientProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </Web3WalletQueryClientProvider>
    </>
  );
}

export default MyApp;
