import type { Route } from '@site/types/Route';
import { WALLETS_DIR } from '@site/utils/constants';
import path from 'path';

export const prefix = '/wallets';

const getPath = (slug: string) => path.join(WALLETS_DIR, `${slug}/README.md`);

export const routes: Route[] = [
  {
    label: 'MetaMask',
    slug: ['metamask'],
    path: getPath('metamask'),
  },
  {
    label: 'DeFi Wallet',
    slug: ['defiwallet'],
    path: getPath('defiwallet'),
  },
  {
    label: 'Walletconnect',
    slug: ['walletconnect'],
    path: getPath('walletconnect'),
  },
  {
    label: 'Coinbase Wallet',
    slug: ['coinbase-wallet'],
    path: getPath('coinbase-wallet'),
  },
  {
    label: 'Desktop Wallet',
    slug: ['cryptocom-desktop-wallet'],
    path: getPath('cryptocom-desktop-wallet'),
  },
  {
    label: 'Brave Wallet',
    slug: ['brave-wallet'],
    path: getPath('brave-wallet'),
  },
  {
    label: 'Trust Wallet',
    slug: ['trust-wallet'],
    path: getPath('trust-wallet'),
  },
  {
    label: 'imToken',
    slug: ['imtoken'],
    path: getPath('imtoken'),
  },
];
