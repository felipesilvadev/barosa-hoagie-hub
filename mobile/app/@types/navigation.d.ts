import type { AuthStackParamList } from '~/navigation/auth-navigator';
import type { AppStackParamList } from '~/navigation/app-navigator';

export type RoutesParamList = AuthStackParamList & AppStackParamList;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RoutesParamList {}
  }
}
