import type { Route } from '@site/types/Route';
import { BLOG_DIR } from '@site/utils/constants';
import path from 'path';

export const prefix = '/blog';

export const routes: Route[] = [
  {
    label: 'Blog Home',
    slug: [],
    path: path.join(BLOG_DIR, 'README.md'),
  },
  {
    label: 'Async Web3 State Management',
    slug: ['async-web3-state-management'],
    path: path.join(BLOG_DIR, 'async-web3-state-management.md'),
  },
];
