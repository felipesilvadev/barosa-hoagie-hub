import { createContext, useState, useEffect, PropsWithChildren } from 'react';

import { authApi, AuthenticateData } from '~/infra/services/auth-service';
import { getToken, removeToken, setToken } from '~/store/token';

type AuthContextType = {
  signIn: (data: AuthenticateData) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  isCheckingToken: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  signIn: async () => {},
  signOut: async () => {},
  isAuthenticated: false,
  isCheckingToken: true,
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await getToken();
    setIsAuthenticated(!!token);
    setIsCheckingToken(false);
  };

  const signIn = async ({ email, password }: AuthenticateData) => {
    try {
      const { data } = await authApi.authenticate({ email, password });
      await setToken(data.access_token);
      setIsAuthenticated(true);
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    await removeToken();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, isCheckingToken }}>
      {children}
    </AuthContext.Provider>
  );
}
