import { NavigationContainer } from '@react-navigation/native';

import { AppNavigator } from './app-navigator';
import { AuthNavigator } from './auth-navigator';
import { useAuth } from '../hooks/use-auth';

export function Routes() {
  const { isAuthenticated, isCheckingToken } = useAuth();

  if (isCheckingToken) return null;

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
