import { ComponentProps } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import colors from 'tailwindcss/colors';

import Icon from './icon';

interface ButtonProps extends TouchableOpacityProps {
  iconName?: ComponentProps<typeof Icon>['name'];
  label: string;
  isLoading?: boolean;
}

const Button = ({ iconName, label, isLoading = false, ...rest }: ButtonProps) => {
  return (
    <TouchableOpacity
      className="bg-primary h-18 w-full flex-row items-center justify-center gap-2 rounded py-4"
      disabled={isLoading}
      {...rest}>
      {isLoading ? (
        <ActivityIndicator color={colors.zinc['900']} size="small" />
      ) : (
        <>
          {iconName && <Icon name={iconName} size={16} color={colors.zinc['900']} />}

          <Text className="font-poppins-medium">{label}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export { Button };
