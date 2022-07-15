import chalk from 'chalk';
import cp from 'child_process';

type PackageName = string;
type BuildConfig = {
  packages: (PackageName | PackageName[])[];
};

export const build = async (config: BuildConfig) => {
  console.log(chalk.blue(`[build]: 10 packages`));

  for (const pkg of config.packages) {
    if (typeof pkg == 'string') {
      await buildPkg(pkg);
    } else {
      await Promise.all(pkg.map((v) => buildPkg(v)));
    }
  }
};

/**
 * "pnpm -F xxx -s -p -c exec tsc",
 * "pnpm --filter xxx --silent --parallel -shell-mode exec tsc",
 *
 * @param pkg the package name
 * @returns
 */
const buildPkg = (pkg: string) => {
  return new Promise((resolve, reject) => {
    console.log(chalk.blue(`[build]: @web3-wallet/${pkg}...`));

    const build = cp.spawn(
      'pnpm',
      ['--silent', '--filter', `@web3-wallet/${pkg}`, 'build'],
      {
        stdio: 'inherit',
      },
    );
    build.on('close', (code) => {
      if (code === 0) {
        console.log(chalk.green(`[build]: @web3-wallet/${pkg} done!\n`));
      }
      code === 0 ? resolve(code) : reject(code);
    });
  });
};
