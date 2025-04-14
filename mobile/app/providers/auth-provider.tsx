import { createContext, useState, useEffect, PropsWithChildren } from 'react';

import { authApi, AuthenticateData } from '~/infra/services/auth-service';
import { getToken, removeToken, setToken } from '~/store/token';
import { getStoredUser, removeStoredUser, setStoredUser } from '~/store/user';

export type User = {
  id: string;
};

type AuthContextType = {
  signIn: (data: AuthenticateData) => Promise<void>;
  signOut: () => Promise<void>;
  user: User;
  isAuthenticated: boolean;
  isCheckingToken: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  signIn: async () => {},
  signOut: async () => {},
  user: {} as User,
  isAuthenticated: false,
  isCheckingToken: true,
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User>({} as User);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await getToken();
    const user = await getStoredUser();

    setUser(user);
    setIsAuthenticated(!!token);
    setIsCheckingToken(false);
  };

  const signIn = async ({ email, password }: AuthenticateData) => {
    try {
      const { data } = await authApi.authenticate({ email, password });
      const { access_token, user } = data;

      await setToken(access_token);
      await setStoredUser(user);

      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    await removeToken();
    await removeStoredUser();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, user, isAuthenticated, isCheckingToken }}>
      {children}
    </AuthContext.Provider>
  );
}
