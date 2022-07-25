import chalk from 'chalk';
import cp from 'child_process';

import type { Package, Packages } from './types';

export const build = async (packages: Packages) => {
  console.log(chalk.blue(`[build]: ${packages.flat().length} packages\n`));

  for (const pkg of packages) {
    if (Array.isArray(pkg)) {
      await Promise.all(pkg.map(buildPkg));
    } else {
      await buildPkg(pkg);
    }
  }

  console.log(chalk.green(`[build]: all done!\n`));
};

/**
 * "pnpm -F xxx -s -p -c exec tsc",
 * "pnpm --filter xxx --silent --parallel -shell-mode exec tsc",
 *
 * @param pkg the package name
 * @returns
 */
const buildPkg = (pkg: Package) => {
  const pkgName = typeof pkg === 'string' ? pkg : pkg.name;

  return new Promise((resolve, reject) => {
    console.log(chalk.blue(`[build]: @web3-wallet/${pkgName}...`));

    const build = cp.spawn(
      'pnpm',
      [
        '--silent',
        '--filter',
        `@web3-wallet/${pkgName}`,
        '--parallel',
        '-shell-mode',
        'exec',
        'tsc;tsc --module commonjs --outDir dist/cjs',
      ],
      {
        stdio: 'inherit',
      },
    );

    build.on('close', (code) => {
      if (code === 0) {
        console.log(chalk.green(`[build]: @web3-wallet/${pkg} done!`));
      }
      code === 0
        ? resolve(code)
        : reject(new Error(`Fail to build @web3-wallet/${pkg}`));
    });
  });
};
