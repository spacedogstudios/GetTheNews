import {View} from 'react-native';
import Articles from '@/components/ui/Articles';

export default function HomeScreen() {
  return (
    <View className="flex-1 justify-center items-center px-8 py-32">
      <Articles />
    </View>
  );
}
