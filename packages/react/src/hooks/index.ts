import type { BalanceHooks } from './balance';
import type { CoreHooks } from './core';
import type { ProviderHooks } from './provider';

export * from './balance';
export * from './core';
export * from './provider';

export type BuiltinHooks = CoreHooks & ProviderHooks & BalanceHooks;
