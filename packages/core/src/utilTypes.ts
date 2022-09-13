/**
 * Utility type for branding/tagging types
 */
export type Brand<K, T> = K & { __brand__: T };
