import type { ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { queryClient } from '../lib/queryClient';
import { PlayerProvider } from '../context/PlayerContext';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <PlayerProvider>
        {children}
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'hsl(var(--surface-hover))',
              color: 'hsl(var(--text-main))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            },
            success: {
              iconTheme: { primary: 'hsl(var(--primary))', secondary: 'white' },
            },
          }}
        />
      </PlayerProvider>
    </QueryClientProvider>
  );
}