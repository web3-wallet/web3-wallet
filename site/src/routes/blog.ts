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
    label: 'Web3 Async State Management',
    slug: ['web3-async-state-management'],
    path: path.join(BLOG_DIR, 'web3-async-state-management.md'),
  },
];
