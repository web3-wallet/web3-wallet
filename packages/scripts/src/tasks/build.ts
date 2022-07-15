import chalk from 'chalk';
import cp from 'child_process';

type PackageName = string;
type BuildConfig = {
  packages: (PackageName | PackageName[])[];
};

export const build = async (config: BuildConfig) => {
  for (const pkg of config.packages) {
    if (typeof pkg == 'string') {
      await buildPkg(pkg);
    } else {
      await Promise.all(pkg.map((v) => buildPkg(v)));
    }
  }
};

const log = (pkg: string, status: 'info' | 'success') => {
  const prefix = '[build]:';
  if (status === 'info') {
    console.log(chalk.blue(`${prefix} @web3-wallet/${pkg}...`));
  } else {
    console.log(chalk.green(`${prefix} @web3-wallet/${pkg} done!\n`));
  }
};

const buildPkg = (pkg: string) => {
  return new Promise((resolve, reject) => {
    log(pkg, 'info');
    const build = cp.spawn(
      'pnpm',
      ['--silent', '--filter', `@web3-wallet/${pkg}`, 'build'],
      {
        stdio: 'inherit',
      },
    );
    build.on('close', (code) => {
      if (code === 0) log(pkg, 'success');
      code === 0 ? resolve(code) : reject(code);
    });
  });
};
