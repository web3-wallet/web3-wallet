import type { Route } from '@site/types/Route';
import { BLOG_DIR } from '@site/utils/constants';
import path from 'path';

export const prefix = '/blog';

export const routes: Route[] = [
  {
    label: 'Blog',
    slug: [],
    path: path.join(BLOG_DIR, 'README.md'),
  },
  {
    label: 'Why Creating web3-wallet',
    slug: ['why-creating-web3-wallet'],
    path: path.join(BLOG_DIR, 'why-creating-web3-wallet.md'),
  },
];
