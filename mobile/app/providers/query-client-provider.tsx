import { QueryClient, QueryClientProvider as QueryClientProviderLib } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

export const queryClient = new QueryClient();

export function QueryClientProvider({ children }: PropsWithChildren) {
  return <QueryClientProviderLib client={queryClient}>{children}</QueryClientProviderLib>;
}
