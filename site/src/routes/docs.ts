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
    label: 'Introduction',
    slug: ['introduction'],
    path: path.join(DOCS_DIR, 'introduction.md'),
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
