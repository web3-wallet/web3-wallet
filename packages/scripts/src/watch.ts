import chalk from 'chalk';
import cp from 'child_process';

type PackageName = string;
type WatchConfig = {
  packages: (PackageName | PackageName[])[];
};

export const watch = async (config: WatchConfig) => {
  console.log(chalk.blue(`[watch]: ${config.packages.flat().length} packages`));
  await Promise.all(config.packages.flat().map((v) => watchPkg(v)));
};

/**
 * "pnpm -F xxx -s -p -c exec tsc --watch",
 * "pnpm --filter xxx --silent --parallel -shell-mode exec tsc --watch",
 *
 * @param pkg the package name
 * @returns
 */
const watchPkg = (pkg: string) => {
  return new Promise((resolve, reject) => {
    console.log(chalk.blue(`[watch]: @web3-wallet/${pkg}`));

    const build = cp.spawn(
      'pnpm',
      [
        '--filter',
        `@web3-wallet/${pkg}`,
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
    build.on('close', (code) => {
      code === 0
        ? resolve(code)
        : reject(new Error(`Fail to watch @web3-wallet/${pkg}`));
    });
  });
};
