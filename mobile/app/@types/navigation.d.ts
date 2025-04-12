import type { AuthStackParamList } from '../navigation/auth-navigator';

export type RoutesParamList = AuthStackParamList;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RoutesParamList {}
  }
}
