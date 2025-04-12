import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignIn, type SignInParams } from '../screens/auth/sign-in';
import { SignUp } from '../screens/auth/sign-up';

export type AuthStackParamList = {
  SignIn: SignInParams;
  SignUp: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}
