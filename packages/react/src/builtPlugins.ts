import { CoreHooksPlugin } from './plugins/core-hooks';
import { ENSPlugin } from './plugins/ens';
import { Web3ProviderPlugin } from './plugins/web3-provider';

/**
 * The dependencies of the builtin plugins are not checked, don't mix up orders.
 */
export const builtinPlugins = [
  CoreHooksPlugin.createPlugin(),
  Web3ProviderPlugin.createPlugin(),
  ENSPlugin.createPlugin(),
];
