import chalk from 'chalk';
import cp from 'child_process';

import { PACKAGE_SCOPE } from './constants';
import type { Package, Packages } from './types';

export const watch = async (packages: Packages) => {
  console.log(chalk.blue(`[watch]: ${packages.flat().length} packages`));
  await Promise.all(packages.flat().map(watchPkg));
};

/**
 * "pnpm -F xxx -s -p -c exec tsc --watch",
 * "pnpm --filter xxx --silent --parallel -shell-mode exec tsc --watch",
 *
 * @param pkg the package name
 * @returns
 */
const watchPkg = (pkg: Package) => {
  const pkgName = typeof pkg === 'string' ? pkg : pkg.name;

  return new Promise((resolve, reject) => {
    console.log(chalk.blue(`[watch]: ${PACKAGE_SCOPE}/${pkgName}`));

    const watch = cp.spawn(
      'pnpm',
      [
        '--filter',
        `@web3-wallet/${pkgName}`,
        '--silent',
        '--parallel',
        '-shell-mode',
        'exec',
        'tsc',
        '--watch',
      ],
      {
        stdio: 'inherit',
      },
    );

    watch.on('close', (code) => {
      code === 0
        ? resolve(code)
        : reject(new Error(`Fail to watch ${PACKAGE_SCOPE}/${pkg}`));
    });
  });
};
