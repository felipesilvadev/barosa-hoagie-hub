import { formatDistanceToNow } from 'date-fns';
import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import colors from 'tailwindcss/colors';

import Icon from './icon';

import { Hoagie } from '~/infra/services/hoagie-service';

type Props = TouchableOpacityProps & {
  hoagie: Hoagie;
};

export function HoagieCard({ hoagie, ...rest }: Props) {
  return (
    <TouchableOpacity className="w-full bg-white p-4" activeOpacity={0.8} {...rest}>
      <Text className="font-poppins-medium text-base text-zinc-900 ">{hoagie.name}</Text>

      <Text className="font-poppins text-sm text-zinc-500 ">
        Ingredients: {hoagie.ingredients.join(', ')}
      </Text>

      <View className="mt-3 flex-row items-center justify-between">
        <Text className="font-poppins text-xs text-zinc-400">
          Created {formatDistanceToNow(new Date(hoagie.createdAt))} ago
        </Text>
        <View className="flex-row items-center gap-1">
          <Icon name="MessageCircle" size={14} color={colors.zinc['400']} />
          <Text className="font-poppins text-xs text-zinc-500">{hoagie.commentCount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
