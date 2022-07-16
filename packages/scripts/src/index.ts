import fs from 'fs';
import path from 'path';

import { build } from './build';
import { watch } from './watch';

export enum Task {
  Build = 'build',
  Watch = 'watch',
}

export type TaskConfig = {
  [Task.Build]: Parameters<typeof build>[0];
  [Task.Watch]: Parameters<typeof watch>[0];
};

export type PackageJson = {
  '@web3-wallet/scripts': {
    [key in Task]: TaskConfig[key];
  };
};

const pkgJsonPath = path.join(process.cwd(), 'package.json');

const pkgJson = JSON.parse(
  fs.readFileSync(pkgJsonPath).toString(),
) as PackageJson;

const task = process.argv[2] as Task;
const taskConfig = pkgJson['@web3-wallet/scripts'] as TaskConfig;

export const run = async (task: Task) => {
  switch (task) {
    case Task.Build:
      await build(taskConfig[Task.Build]);
      break;
    case Task.Watch:
      await watch(taskConfig[Task.Watch]);
      break;
    default:
      throw new Error(`unknown task "${task}"`);
  }
};

run(task);
