import type { Route } from '@site/types/Route';
import { DOCS_DIR, PACKAGES_DIR } from '@site/utils/constants';
import path from 'path';

export const prefix = '/docs';

export const routes: Route[] = [
  {
    label: 'Getting Started',
    slug: ['getting-started'],
    path: path.join(DOCS_DIR, `/getting-started.md`),
  },
  {
    label: 'Wallet',
    slug: ['wallet'],
    path: path.join(DOCS_DIR, 'wallet.md'),
  },
  {
    label: 'CurrentWallet',
    slug: ['current-wallet'],
    path: path.join(DOCS_DIR, 'current-wallet.md'),
  },
  {
    label: 'Plugin',
    slug: ['plugin'],
    path: path.join(DOCS_DIR, 'plugin.md'),
  },
  {
    label: 'Connector',
    slug: ['connector'],
    path: path.join(DOCS_DIR, 'connector.md'),
  },
  {
    label: 'Provider Detection',
    slug: ['provider-detection'],
    path: path.join(PACKAGES_DIR, 'detect-provider/README.md'),
  },
  {
    label: 'Roadmap',
    slug: ['roadmap'],
    path: path.join(DOCS_DIR, 'roadmap.md'),
  },
];
