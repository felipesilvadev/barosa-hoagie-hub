import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import colors from 'tailwindcss/colors';

import Icon from './icon';

export function HoagieAddButton() {
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      className="bg-primary bottom-safe absolute right-4 h-16 w-16 items-center justify-center rounded-full"
      activeOpacity={0.8}
      onPress={() => navigate('CreateHoagie')}>
      <Icon name="Plus" color={colors.zinc[700]} />
    </TouchableOpacity>
  );
}
