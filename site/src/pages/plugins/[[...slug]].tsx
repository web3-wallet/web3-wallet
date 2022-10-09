import { Layout } from '@site/components/Layout';
import { Markdown } from '@site/components/Markdown';
import { prefix, routes } from '@site/routes/plugins';
import type { Docs } from '@site/types/Docs';
import type { Route } from '@site/types/Route';
import { getRouteBySlug } from '@site/utils/getRouteBySlug';
import { readDocs } from '@site/utils/readDocs';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

export const getStaticPaths: GetStaticPaths = () => {
  const paths = routes.map(({ slug }) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export type PageProps = {
  route: Route;
  docs: Docs;
};

export const getStaticProps: GetStaticProps<
  PageProps,
  { slug: string[] }
> = async (context) => {
  const slug = context.params?.slug || [];

  const route = getRouteBySlug(slug, routes) as Route;
  const docs = await readDocs(route.path);

  return {
    props: {
      docs,
      route,
    },
  };
};

const Page: NextPage<PageProps> = ({ route, docs }) => {
  const pageTitle = `${route.label} | Web3 Wallet `;

  return (
    <Layout
      toc={docs.toc}
      leftSidebarProps={{
        navItems: routes.map(({ label, slug, indent }) => ({
          indent: indent || 1,
          label,
          url: `${prefix}/${slug.join('/')}`,
        })),
      }}
    >
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Markdown docs={docs} />
    </Layout>
  );
};

export default Page;
