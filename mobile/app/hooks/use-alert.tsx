import { useCallback } from 'react';
import Toast, { type ToastShowParams } from 'react-native-toast-message';

export function useAlert() {
  const showAlert = useCallback(({ type = 'success', ...rest }: ToastShowParams) => {
    Toast.show({
      type,
      text1Style: {
        fontFamily: 'Poppins_500Medium',
      },
      text2Style: {
        fontFamily: 'Poppins_400Regular',
      },
      visibilityTime: 3000,
      ...rest,
    });
  }, []);

  return { showAlert };
}
