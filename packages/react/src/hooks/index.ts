import type { CoreHooks } from './core';
import type { ProviderHooks } from './provider';

export * from './core';
export * from './provider';

export type BuiltinHooks = CoreHooks & ProviderHooks;
