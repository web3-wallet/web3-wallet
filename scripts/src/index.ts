import fs from 'fs';
import path from 'path';

import { build } from './build';
import { type PackageJson, Task } from './types';
import { packagesFilter } from './utils';
import { watch } from './watch';

const pkgJsonPath = path.join(process.cwd(), 'package.json');

const pkgJson = JSON.parse(
  fs.readFileSync(pkgJsonPath).toString(),
) as PackageJson;

const task = process.argv[2] as Task;

const packages = pkgJson['@web3-wallet/scripts'].packages;

const packagesToBuild = packagesFilter(
  packages,
  (pkg) => typeof pkg === 'string' || pkg.build !== false,
);

const packagesToWatch = packagesFilter(
  packages,
  (pkg) => typeof pkg === 'string' || pkg.watch !== false,
);

export const run = async (task: Task) => {
  switch (task) {
    case Task.Build:
      await build(packagesToBuild);
      break;
    case Task.Watch:
      await watch(packagesToWatch);
      break;
    default:
      throw new Error(`unknown task "${task}"`);
  }
};

run(task);
