import type {
  MutationFunction,
  QueriesOptions,
  QueriesResults,
  QueryFunction,
  QueryKey,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import {
  useInfiniteQuery as _useInfiniteQuery,
  useIsFetching as _useIsFetching,
  useIsMutating as _useIsMutating,
  useMutation as _useMutation,
  useQueries as _useQueries,
  useQuery as _useQuery,
} from '@tanstack/react-query';

import { queryContext } from './client';

export const useQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    'queryKey' | 'queryFn'
  >,
): UseQueryResult<TData, TError> =>
  _useQuery(queryKey, queryFn, {
    context: queryContext,
    ...options,
  });

export type WrappedUseQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = {
  (
    queryKey?: TQueryKey,
    options?: Omit<
      UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
      'queryKey' | 'queryFn'
    >,
  ): UseQueryResult<TData, TError>;
};

export const useMutation = <
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
>(
  mutationFn: MutationFunction<TData, TVariables>,
  options?: UseMutationOptions<TData, TError, TVariables, TContext>,
): UseMutationResult<TData, TError, TVariables, TContext> =>
  _useMutation(options?.mutationFn ?? mutationFn, {
    context: queryContext,
    ...options,
  });

// https://github.com/TanStack/query/issues/4264
export type WrappedUseMutation<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
> = (
  options?: UseMutationOptions<TData, TError, TVariables, TContext>,
) => UseMutationResult<TData, TError, TVariables, TContext>;

export const useInfiniteQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: UseInfiniteQueryOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryFnData,
    TQueryKey
  >,
): UseInfiniteQueryResult<TData, TError> => _useInfiniteQuery(options);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useQueries: typeof _useQueries = <T extends any[]>({
  queries,
  context,
}: {
  queries: readonly [...QueriesOptions<T>];
  context?: UseQueryOptions['context'];
}): QueriesResults<T> =>
  _useQueries<T>({ queries, context: context ?? queryContext });

export const useIsMutating = (
  mutationKey?: Parameters<typeof _useIsMutating>[0],
  filters?: Parameters<typeof _useIsMutating>[1],
  options?: Parameters<typeof _useIsMutating>[2],
): ReturnType<typeof _useIsMutating> =>
  _useIsMutating(mutationKey, filters, { context: queryContext, ...options });

export const useIsFetching = (
  mutationKey?: Parameters<typeof _useIsFetching>[0],
  filters?: Parameters<typeof _useIsFetching>[1],
  options?: Parameters<typeof _useIsFetching>[2],
): ReturnType<typeof _useIsFetching> =>
  _useIsFetching(mutationKey, filters, { context: queryContext, ...options });
