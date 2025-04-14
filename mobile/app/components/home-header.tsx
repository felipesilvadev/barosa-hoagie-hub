import { Text, TouchableWithoutFeedback, View } from 'react-native';
import colors from 'tailwindcss/colors';

import Icon from './icon';

import { useAuth } from '~/hooks/use-auth';

const HomeHeader = () => {
  const { signOut } = useAuth();

  return (
    <View className="bg-primary h-1/6 w-full flex-row items-end justify-between px-3 pb-5">
      <View>
        <Text className="font-poppins-bold mb-1 text-lg">Hoagie Hub</Text>
      </View>

      <View className="flex-row items-center gap-5">
        <TouchableWithoutFeedback onPress={signOut}>
          <Icon name="LogOut" size={20} color={colors.zinc['900']} />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export { HomeHeader };
