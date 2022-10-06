/**
 * Utility type for branding/tagging types
 */
export type Brand<K, T> = K & { __brand__: T };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFn = (...args: any[]) => any;

export type Override<A, B> = {
  [K in keyof A]: K extends keyof B ? B[K] : A[K];
};

export type LastArgument<T extends (...a: never[]) => unknown> = T extends (
  ...a: [...infer _, infer A]
) => unknown
  ? A
  : never;

export type DropFirstArgument<T extends (...a: never[]) => unknown> =
  T extends (...a: [infer _, ...infer A]) => infer R ? (...a: A) => R : never;

export type DropFirst2Arguments<T extends (...a: never[]) => unknown> =
  T extends (...a: [infer _, infer _, ...infer A]) => infer R
    ? (...a: A) => R
    : never;

export type DropSecondArgument<T extends (...a: never[]) => unknown> =
  T extends (...a: [infer A1, infer _, ...infer A]) => infer R
    ? (first: A1, ...a: A) => R
    : never;

export type DropThirdArgument<T extends (...a: never[]) => unknown> =
  T extends (...a: [infer A1, infer A2, infer _, ...infer A]) => infer R
    ? (a1: A1, a2: A2, ...a: A) => R
    : never;

export type DropLastArgument<T extends (...a: never[]) => unknown> = T extends (
  ...a: [...infer A, infer _]
) => infer R
  ? (...a: A) => R
  : never;

export type MakeFirstArgumentOptional<T extends (...a: never[]) => unknown> =
  T extends (...a: [infer A1, ...infer A]) => infer R
    ? (a1?: A1, ...a: A) => R
    : never;

export type OptionalIfUndefined<T> = undefined extends T
  ? [param?: T]
  : [param: T];
