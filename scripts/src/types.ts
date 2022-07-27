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

export type PackageJson = {
  '@web3-wallet/scripts': Config;
};
