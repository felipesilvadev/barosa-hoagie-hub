import * as SecureStore from 'expo-secure-store';

import { User } from '~/providers/auth-provider';

const KEY = 'user';

const getStoredUser = async () => {
  const user = await SecureStore.getItemAsync(KEY);

  if (!user) return {} as User;

  return JSON.parse(user) as User;
};

const setStoredUser = async (user: User) => {
  await SecureStore.setItemAsync(KEY, JSON.stringify(user));
};

const removeStoredUser = async () => {
  await SecureStore.deleteItemAsync(KEY);
};

export { getStoredUser, setStoredUser, removeStoredUser };
