import type { Brand } from './utils';

export type PluginName<T extends string = string> = Brand<
  T,
  '@web-3wallet/plugin'
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PluginApiMap = Map<PluginName, any>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Plugin<TPluginApi = any, TPluginContext = any> = {
  (context: TPluginContext): TPluginApi;
  pluginName: PluginName;
};
