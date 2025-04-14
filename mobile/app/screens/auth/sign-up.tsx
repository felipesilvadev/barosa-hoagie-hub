import { Link, useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';

import { Button } from '~/components/button';
import { Input } from '~/components/input';
import { useAlert } from '~/hooks/use-alert';
import { authApi, RegisterData } from '~/infra/services/auth-service';
import { getErrorMessage } from '~/utils/get-error-message';

const SignUp = () => {
  const { showAlert } = useAlert();
  const { navigate } = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutateAsync: register, isPending } = useMutation({
    mutationFn: async ({ name, email, password }: RegisterData) => {
      await authApi.register({ name, email, password });
    },
    onSuccess: () => {
      showAlert({
        text1: 'Account successfully created',
        text2: 'Sign in with your email and password',
      });
      navigate('SignIn', { email });
    },
    onError: (error) => {
      showAlert({
        type: 'error',
        text1: getErrorMessage(error, 'Unexpected error while signing up'),
      });
    },
  });

  const handleSignUp = () => {
    if (!name) {
      showAlert({
        type: 'info',
        text1: 'Name is required',
      });
      return;
    }

    if (!email) {
      showAlert({
        type: 'info',
        text1: 'E-mail is required',
      });
      return;
    }

    if (!password) {
      showAlert({
        type: 'info',
        text1: 'Password is required',
      });
      return;
    }

    register({ name, email, password });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1">
      <View className="flex-1 justify-center gap-8 px-6">
        <View>
          <Text className="font-poppins-medium text-3xl">Sign Up</Text>
          <Text className="font-poppins text-zinc-400">How good to have you here!</Text>
        </View>

        <View className="gap-3">
          <Input
            label="Name"
            placeholder="John Doe"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
          <Input
            label="E-mail"
            placeholder="email@example.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
          />
          <Input
            isPassword
            label="Password"
            placeholder="*******"
            value={password}
            onChangeText={setPassword}
          />

          <Button
            label="Sign Up"
            iconName="UserPlus"
            onPress={handleSignUp}
            isLoading={isPending}
          />
        </View>

        <View className="items-center">
          <Text>
            Do you already have an account?{' '}
            <Link screen="SignIn">
              <Text className="font-poppins-medium text-zinc-900">Sign In</Text>
            </Link>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export { SignUp };
