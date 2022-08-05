import { PACKAGE_SCOPE } from './constants';

export enum Task {
  Build = 'build',
  Watch = 'watch',
}

export type PackageName = string;

export type Package =
  | PackageName
  | {
      name: string;
      build?: boolean;
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
