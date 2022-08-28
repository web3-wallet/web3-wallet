import { PACKAGE_SCOPE } from './constants';

/**
 * available tasks
 */
export enum Task {
  Build = 'build',
  Watch = 'watch',
}

export type BuildTarge = 'esm' | 'cjs';
export type WatchTarget = BuildTarge;

export type PackageName = string;

export type Package =
  | PackageName
  | {
      name: string;
      /**
       * Default to true.
       * If set to false, will skip to build this package.
       */
      build?: boolean;
      /**
       * Default to true.
       * If set to false, will skip to watch this package.
       */
      watch?: boolean;
    };

export type Packages = (Package | Package[])[];

export interface Config {
  packages: Packages;
}

const SCRIPTS_PACKAGE = `${PACKAGE_SCOPE}/scripts` as const;
export type PackageJson = {
  [SCRIPTS_PACKAGE]: Config;
};
