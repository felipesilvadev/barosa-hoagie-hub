import * as SecureStore from 'expo-secure-store';

const getToken = async () => {
  const token = await SecureStore.getItemAsync('token');
  return token;
};

const setToken = async (token: string) => {
  await SecureStore.setItemAsync('token', token);
};

const removeToken = async () => {
  await SecureStore.deleteItemAsync('token');
};

export { getToken, setToken, removeToken };
