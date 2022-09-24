import { Divider, Grid, Heading, Spacer } from '@chakra-ui/react';
import { Layout } from '@site/components/Layout';
import Head from 'next/head';

import { ShowcaseCard } from './ShowcaseCard';
import { showCaseList } from './showcaseList';

export function Page() {
  return (
    <Layout hideLeftSideBar>
      <Head>
        <title>Showcase | Web3 Wallet </title>
      </Head>
      <Spacer my={16} />
      <Heading as="h1" textAlign="center">
        Showcase
      </Heading>
      <Spacer my={16} />
      <Divider />
      <Spacer my={16} />
      <Grid
        gap={4}
        templateColumns={{
          base: 'repeat(1, minmax(0, 1fr))',
          md: 'repeat(2, minmax(0, 1fr))',
          lg: 'repeat(3, minmax(0, 1fr))',
          xl: 'repeat(4, minmax(0, 1fr))',
        }}
      >
        {showCaseList.map((v) => (
          <ShowcaseCard key={v.name} showcaseItem={v} />
        ))}
      </Grid>
    </Layout>
  );
}
