import chalk from 'chalk';
import cp from 'child_process';

import type { BuildTarge, Package, PackageName, Packages } from './types';

type BuildProgress = Record<PackageName, Record<BuildTarge, boolean>>;

const buildProgress: BuildProgress = {};

export const build = async (packages: Packages) => {
  console.log(
    chalk.blueBright(`[build]: ${packages.flat().length} packages...`)
  );

  for (const pkg of packages.flat()) {
    const pkgName = typeof pkg === 'string' ? pkg : pkg.name;
    console.log(chalk.blueBright(`[build]: ${pkgName}...`));
  }

  await Promise.all([
    buildTarget(packages, 'esm'),
    buildTarget(packages, 'cjs'),
  ]);

  console.log(chalk.green(`[build]: success!\n`));
};

const buildTarget = async (packages: Packages, target: BuildTarge) => {
  for (const pkg of packages) {
    if (Array.isArray(pkg)) {
      await Promise.all(pkg.map((v) => buildPkg(v, target)));
    } else {
      await buildPkg(pkg, target);
    }
  }
};

/**
 * "pnpm -F [pkgName] -s -c exec tsc",
 * "pnpm --filter [pkgName] --silent -shell-mode exec tsc",
 *
 * @param pkg the package name
 * @returns
 */
const buildPkg = (pkg: Package, target: BuildTarge) => {
  const pkgName = typeof pkg === 'string' ? pkg : pkg.name;

  if (!buildProgress[pkgName]) {
    buildProgress[pkgName] = {
      esm: false,
      cjs: false,
    };
  } else {
    buildProgress[pkgName][target] = false;
  }

  return new Promise((resolve, reject) => {
    const build = cp.spawn(
      'pnpm',
      [
        '--silent',
        '--filter',
        pkgName,
        '-shell-mode',
        'exec',
        target === 'esm' ? 'tsc' : 'tsc --module commonjs --outDir dist/cjs',
      ],
      {
        stdio: 'inherit',
      }
    );

    build.on('close', (code) => {
      if (code === 0) buildProgress[pkgName][target] = true;

      if (
        code === 0 &&
        buildProgress[pkgName].esm &&
        buildProgress[pkgName].cjs
      ) {
        console.log(chalk.green(`[build]: ${pkgName} success!`));
      }

      code === 0
        ? resolve(code)
        : reject(new Error(`Fail to build ${pkgName}`));
    });
  });
};
