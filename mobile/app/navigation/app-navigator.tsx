import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CreateHoagie } from '~/screens/create-hoagie';
import { Home } from '~/screens/home';

export type AppStackParamList = {
  Home: undefined;
  CreateHoagie: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CreateHoagie" component={CreateHoagie} />
    </Stack.Navigator>
  );
}
