import chalk from 'chalk';
import fs from 'fs/promises';
import path from 'path';

import { CONFIG_FILE_NAME, PACKAGE_SCOPE } from '../constants';
import type { Config, PackageJson } from '../types';

const configFilePath = path.join(process.cwd(), CONFIG_FILE_NAME);
const pkgJsonPath = path.join(process.cwd(), 'package.json');

const readFromConfigFile = async (): Promise<Config> => {
  const content = await fs.readFile(configFilePath, 'utf-8');
  try {
    // remove lines that starts with //
    const commentedLines = /^(\s*\/\/).*$/gm;
    const config = JSON.parse(content.replace(commentedLines, '')) as Config;
    console.log(
      chalk.green(
        `[info]: reading configuration from ${path.basename(configFilePath)}`
      )
    );
    return config;
  } catch (e) {
    console.log(
      chalk.red(`[error]: failed to parse ${path.basename(configFilePath)}`)
    );
    console.log(e);
    throw e;
  }
};

const readFromPackageJson = async (): Promise<Config> => {
  const content = await fs.readFile(pkgJsonPath, 'utf-8');
  const config = (JSON.parse(content) as PackageJson)[
    `${PACKAGE_SCOPE}/scripts`
  ];
  console.log(
    chalk.green(
      `[info]: reading configuration from ${path.basename(pkgJsonPath)}`
    )
  );
  return config;
};

export const getConfig = async (): Promise<Config> => {
  try {
    return await readFromConfigFile();
  } catch (_) {
    return await readFromPackageJson();
  }
};
