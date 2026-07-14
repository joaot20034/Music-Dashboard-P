import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
      gcTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false, // Don't refetch when switching browser tabs (avoids API spam)
      retry: 1,
    },
  },
});