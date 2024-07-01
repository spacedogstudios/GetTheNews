import {Text, View, Button} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '@/types';

type Props = NativeStackScreenProps<StackParamList, 'Modal'>;

export default function ModalScreen({navigation}: Props) {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="size-3">This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}
