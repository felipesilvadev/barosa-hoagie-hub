import { useNavigation } from '@react-navigation/native';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import colors from 'tailwindcss/colors';

import Icon from './icon';

type Props = {
  title: string;
};

const ScreenHeader = ({ title }: Props) => {
  const { goBack } = useNavigation();

  return (
    <View className="w-full flex-row justify-between bg-transparent px-3 py-2">
      <TouchableWithoutFeedback className="p-2" onPress={goBack}>
        <Icon name="ChevronLeft" size={24} color={colors.zinc['900']} />
      </TouchableWithoutFeedback>

      <View>
        <Text className="font-poppins-medium text-lg">{title}</Text>
      </View>

      <View className="w-6" />
    </View>
  );
};

export { ScreenHeader };
