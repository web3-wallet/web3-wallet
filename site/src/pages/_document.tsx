import { ColorModeScript } from '@chakra-ui/react';
import { theme } from '@site/theme';
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* <link rel="shortcut icon" href={`${__BASE_PATH__}/favicon.png`} /> */}
        <link
          rel="shortcut icon"
          href={`https://web3-wallet.github.io/web3-wallet/favicon.png`}
        />
      </Head>
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
