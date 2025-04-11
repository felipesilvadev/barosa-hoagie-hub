import { PropsWithChildren } from 'react';

import { AuthProvider } from './auth-provider';

const AppProvider = ({ children }: PropsWithChildren) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export { AppProvider };
