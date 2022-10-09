import type { Route } from '@site/types/Route';
import { PLUGINS_DIR } from '@site/utils/constants';
import path from 'path';

export const prefix = '/plugins';

const getPath = (slug: string) => path.join(PLUGINS_DIR, `${slug}/README.md`);

export const routes: Route[] = [
  {
    label: 'Balance',
    slug: ['balance'],
    path: getPath('balance'),
  },
  {
    label: 'Ens',
    slug: ['ens'],
    path: getPath('ens'),
  },
];
