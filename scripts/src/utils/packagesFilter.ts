import type { Package, Packages } from '../types';

export const packagesFilter = (
  packages: Packages,
  predict: (pkg: Package) => boolean,
): Packages => {
  const output: Packages = [];

  for (const pkg of packages) {
    if (Array.isArray(pkg)) {
      output.push(packagesFilter(pkg, predict) as Package[]);
    } else {
      if (predict(pkg)) output.push(pkg);
    }
  }

  return output;
};
