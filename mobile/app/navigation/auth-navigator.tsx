import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignIn } from '../screens/auth/sign-in';
import { SignUp } from '../screens/auth/sign-up';

const Stack = createNativeStackNavigator();

export function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}
