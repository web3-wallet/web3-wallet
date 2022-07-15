import fs from 'fs';
import path from 'path';

import { build, watch } from './tasks/index';

export enum TaskName {
  Build = 'build',
  Watch = 'watch',
}

export type TaskConfig = {
  [TaskName.Build]: Parameters<typeof build>[0];
  [TaskName.Watch]: Parameters<typeof watch>[0];
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

export const runTasks = async () => {
  try {
    switch (taskName) {
      case TaskName.Build:
        await build(taskConfig[TaskName.Build]);
        break;
      case TaskName.Watch:
        await watch(taskConfig[TaskName.Watch]);
        break;
      default:
        throw new Error(`unknown task task name ${taskName}`);
    }
  } catch (error) {
    console.error(error);
  }
};

runTasks();
