import {createNavigationContainerRef} from '@react-navigation/native';
import {StackParamList} from '@/types';

export const navigationRef = createNavigationContainerRef<StackParamList>();

export function navigate(name: keyof StackParamList, params = undefined) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
