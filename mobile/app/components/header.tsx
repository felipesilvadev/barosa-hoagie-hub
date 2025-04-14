import { Text, TouchableWithoutFeedback, View } from 'react-native';
import colors from 'tailwindcss/colors';

import Icon from './icon';

const Header = () => {
  return (
    <View className="bg-primary h-1/6 w-full flex-row items-end justify-between px-3 pb-5">
      <View>
        <Text className="font-poppins-bold mb-1 text-lg">Hoagie Hub</Text>
      </View>

      <View className="flex-row items-center gap-3">
        <TouchableWithoutFeedback>
          <Icon name="LogOut" size={20} color={colors.zinc['900']} />
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback>
          <Icon name="User" size={20} color={colors.zinc['900']} />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export { Header };
