import chalk from 'chalk';
import fs from 'fs/promises';
import path from 'path';

import { ENV_FILE_NAME, PACKAGE_SCOPE } from '../constants';
import { Config, PackageJson } from '../types';

const envFilePath = path.join(process.cwd(), ENV_FILE_NAME);
const pkgJsonPath = path.join(process.cwd(), 'package.json');

const readConfigFromEvnFile = async (): Promise<Config> => {
  const content = await fs.readFile(envFilePath, 'utf-8');
  try {
    // remove lines that starts with //
    const commentedLines = /^(\s*\/\/).*$/gm;
    const config = JSON.parse(content.replace(commentedLines, '')) as Config;
    console.log(
      chalk.green(
        `[info]: reading configuration from ${path.basename(envFilePath)}`,
      ),
    );
    return config;
  } catch (e) {
    console.log(
      chalk.red(`[error]: failed to parse ${path.basename(envFilePath)}`),
    );
    console.log(e);
    throw e;
  }
};

const readConfigFromPackageJson = async (): Promise<Config> => {
  const content = await fs.readFile(pkgJsonPath, 'utf-8');
  const config = (JSON.parse(content) as PackageJson)[
    `${PACKAGE_SCOPE}/scripts`
  ];
  console.log(
    chalk.green(
      `[info]: reading configuration from ${path.basename(pkgJsonPath)}`,
    ),
  );
  return config;
};

export const getConfig = async (): Promise<Config> => {
  try {
    return await readConfigFromEvnFile();
  } catch (_) {
    return await readConfigFromPackageJson();
  }
};
