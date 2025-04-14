import { Link, useRoute } from '@react-navigation/native';
import { useReducer, useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';

import { Button } from '~/components/button';
import { Input } from '~/components/input';
import { useAlert } from '~/hooks/use-alert';
import { useAuth } from '~/hooks/use-auth';
import { getErrorMessage } from '~/utils/get-error-message';

export type SignInParams =
  | {
      email: string;
    }
  | undefined;

const SignIn = () => {
  const { signIn } = useAuth();
  const { showAlert } = useAlert();

  const { params } = useRoute();
  const signInParams = params as SignInParams;

  const [email, setEmail] = useState(signInParams?.email ?? '');
  const [password, setPassword] = useState('');
  const [isLoading, toggleIsLoading] = useReducer((state) => !state, false);

  const handleSignIn = async () => {
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

    try {
      toggleIsLoading();
      await signIn({ email, password });
    } catch (error) {
      showAlert({
        type: 'error',
        text1: getErrorMessage(error, 'Unexpected error while signing in'),
      });
    } finally {
      toggleIsLoading();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1">
      <View className="flex-1 justify-center gap-8 px-6">
        <View>
          <Text className="font-poppins-medium text-3xl">Sign In</Text>
          <Text className="font-poppins text-zinc-400">Welcome back!</Text>
        </View>

        <View className="gap-3">
          <Input
            label="E-mail"
            placeholder="email@email.com"
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

          <Button label="Sign In" iconName="LogIn" onPress={handleSignIn} isLoading={isLoading} />
        </View>

        <View className="items-center">
          <Text>
            Don't have an account?{' '}
            <Link screen="SignUp">
              <Text className="font-poppins-medium text-zinc-900">Sign Up</Text>
            </Link>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export { SignIn };
