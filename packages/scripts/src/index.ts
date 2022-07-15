import fs from 'fs';
import path from 'path';

import { build } from './tasks';

export enum TaskName {
  Build = 'build',
}

const tasks = {
  [TaskName.Build]: build,
};

export type TaskConfig = {
  [TaskName.Build]: Parameters<typeof tasks.build>[0];
};

export type PackageJson = {
  '@web3-wallet/scripts': {
    [key in TaskName]: TaskConfig[key];
  };
};

const pkgJsonPath = path.join(process.cwd(), 'package.json');

const pkgJson = JSON.parse(
  fs.readFileSync(pkgJsonPath).toString(),
) as PackageJson;

const taskName = process.argv[2] as TaskName;
const taskConfig = pkgJson['@web3-wallet/scripts'] as TaskConfig;

const runTasks = async () => {
  try {
    await tasks[taskName](taskConfig[taskName]);
    // eslint-disable-next-line no-empty
  } catch (_) {}
};

runTasks();
