import { NavigationContainer } from '@react-navigation/native';

import { AppNavigator } from './app-navigator';
import { AuthNavigator } from './auth-navigator';
import { useAuth } from '../hooks/use-auth';

export function Routes() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
