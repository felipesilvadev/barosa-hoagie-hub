import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CreateHoagie } from '~/screens/create-hoagie';
import { HoagieDetails, HoagieDetailsParams } from '~/screens/hoagie-details';
import { Home } from '~/screens/home';

export type AppStackParamList = {
  Home: undefined;
  CreateHoagie: undefined;
  HoagieDetails: HoagieDetailsParams;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CreateHoagie" component={CreateHoagie} />
      <Stack.Screen name="HoagieDetails" component={HoagieDetails} />
    </Stack.Navigator>
  );
}
