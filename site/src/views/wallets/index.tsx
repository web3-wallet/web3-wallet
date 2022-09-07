import { Flex, Heading, Spacer } from '@chakra-ui/react';
import { Layout } from '@site/components/Layout';
import Head from 'next/head';

export function Page() {
  return (
    <Layout>
      <Head>
        <title>Wallets | Web3 Wallet </title>
      </Head>
      <Spacer my={12} />
      <Flex flexDirection="column" gap={12}>
        <Heading as="h1">WIP...</Heading>
      </Flex>
    </Layout>
  );
}
