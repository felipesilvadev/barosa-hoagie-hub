import { useReducer } from 'react';
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import colors from 'tailwindcss/colors';

import Icon from './icon';

interface InputProps extends TextInputProps {
  label: string;
  isPassword?: boolean;
}

const Input = ({ label, isPassword = false, ...rest }: InputProps) => {
  const [showPassword, toggleShowPassword] = useReducer((state) => !state, isPassword);

  const handleChangePasswordVisibility = () => toggleShowPassword();

  return (
    <View className="w-full">
      <Text className="font-poppins mb-1 text-sm">{label}</Text>

      <View className="h-18 flex-row items-center rounded bg-zinc-200  px-3 py-4">
        <TextInput secureTextEntry={showPassword} className="flex-1 pr-2" {...rest} />

        {isPassword && (
          <TouchableOpacity onPress={handleChangePasswordVisibility}>
            <Icon size={16} name={showPassword ? 'Eye' : 'EyeOff'} color={colors['zinc']['700']} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export { Input };
