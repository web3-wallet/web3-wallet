import { build } from './build';
import { Task } from './types';
import { getConfig, packagesFilter } from './utils';
import { watch } from './watch';

export const run = async (task: Task) => {
  const config = await getConfig();

  const packagesToBuild = packagesFilter(
    config.packages,
    (pkg) => typeof pkg === 'string' || pkg.build !== false,
  );

  const packagesToWatch = packagesFilter(
    config.packages,
    (pkg) => typeof pkg === 'string' || pkg.watch !== false,
  );

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

run(process.argv[2] as Task);
