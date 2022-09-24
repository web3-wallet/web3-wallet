import type { Route } from '@site/types/Route';
import { PLUGINS_DIR } from '@site/utils/constants';
import path from 'path';

export const prefix = '/plugins';

const getPath = (slug: string) => path.join(PLUGINS_DIR, `${slug}/README.md`);

export const routes: Route[] = [
  {
    label: 'Introduction',
    slug: [],
    path: path.join(PLUGINS_DIR, `/README.md`),
  },
  {
    label: 'Balance',
    slug: ['balance'],
    path: getPath('balance'),
  },
  {
    label: 'ENS',
    slug: ['ens'],
    path: getPath('ens'),
  },
  {
    label: 'Connection Status',
    slug: ['connection-status'],
    path: getPath('connection-status'),
  },
];
