import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* <link rel="shortcut icon" href={`${__SITE_PREFIX__}/favicon.png`} /> */}
        <link
          rel="shortcut icon"
          href={`https://web3-wallet.github.io/web3-wallet/favicon.png`}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
