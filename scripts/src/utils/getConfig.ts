import chalk from 'chalk';
import fs from 'fs/promises';
import path from 'path';

import { Config, PackageJson } from '../types';

const envFilePath = path.join(process.cwd(), '.evn.scripts.json');
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
  const config = (JSON.parse(content) as PackageJson)['@web3-wallet/scripts'];
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
