import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { createContext } from 'react';

export const defaultQueryClient = new QueryClient();
export const queryContext = createContext<QueryClient | undefined>(undefined);

type Web3WalletQueryClientProviderProps = {
  children: ReactNode;
  queryClient?: QueryClient;
};

export const Web3WalletQueryClientProvider = ({
  children,
  queryClient,
}: Web3WalletQueryClientProviderProps) => {
  return (
    <QueryClientProvider
      client={queryClient ?? defaultQueryClient}
      context={queryContext}
    >
      {children}
    </QueryClientProvider>
  );
};
