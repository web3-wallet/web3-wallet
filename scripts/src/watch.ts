import chalk from 'chalk';
import cp from 'child_process';

import type { Package, Packages, WatchTarget } from './types';

export const watch = async (packages: Packages) => {
  console.log(chalk.blueBright(`[watch]: ${packages.flat().length} packages`));

  for (const pkg of packages.flat()) {
    const pkgName = typeof pkg === 'string' ? pkg : pkg.name;
    console.log(chalk.blueBright(`[watch]: ${pkgName}...`));
  }

  await Promise.all(
    packages
      .flat()
      .map((v) => [watchPkg(v, 'esm'), watchPkg(v, 'cjs')])
      .flat(),
  );
};

/**
 * "pnpm -F [pkgName] -s -c exec tsc --watch",
 * "pnpm --filter [pkgName] --silent -shell-mode exec tsc",
 *
 * @param pkg the package name
 * @returns
 */
const watchPkg = (pkg: Package, target: WatchTarget) => {
  const pkgName = typeof pkg === 'string' ? pkg : pkg.name;

  return new Promise((resolve, reject) => {
    const watch = cp.spawn(
      'pnpm',
      [
        '--silent',
        '--filter',
        pkgName,
        '-shell-mode',
        'exec',
        target === 'esm'
          ? 'tsc --watch'
          : 'tsc --module commonjs --outDir dist/cjs --watch',
      ],
      {
        stdio: 'inherit',
      },
    );

    watch.on('close', (code) => {
      code === 0
        ? resolve(code)
        : reject(new Error(`Fail to build ${pkgName}`));
    });
  });
};
