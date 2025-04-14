import * as SecureStore from 'expo-secure-store';

const KEY = 'token';

const getToken = async () => {
  const token = await SecureStore.getItemAsync(KEY);
  return token;
};

const setToken = async (token: string) => {
  await SecureStore.setItemAsync(KEY, token);
};

const removeToken = async () => {
  await SecureStore.deleteItemAsync(KEY);
};

export { getToken, setToken, removeToken };
