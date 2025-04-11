import { createContext, useState, useEffect, PropsWithChildren } from 'react';

import { getToken, removeToken, setToken } from '~/store/token';

type AuthContextType = {
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  signIn: async () => {},
  signOut: async () => {},
  isAuthenticated: false,
  isLoading: true,
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await getToken();
    setIsAuthenticated(!!token);
    setIsLoading(false);
  };

  const signIn = async (token: string) => {
    await setToken(token);
    setIsAuthenticated(true);
  };

  const signOut = async () => {
    await removeToken();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
