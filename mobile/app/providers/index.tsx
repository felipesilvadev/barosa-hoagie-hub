import { PropsWithChildren } from 'react';

import { AuthProvider } from './auth-provider';
import { QueryClientProvider } from './query-client-provider';

const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};

export { AppProvider };
