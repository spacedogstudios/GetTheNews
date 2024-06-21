import {Text, View} from 'react-native';
import {useAtom} from 'jotai';
import {selectedArticleAtom} from '@/atoms';
import {useEffect} from 'react';
import {StackParamList} from '@/types';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<StackParamList, 'Details'>;

export default function DetailsScreen({navigation}: Props) {
  const [selectedArticle] = useAtom(selectedArticleAtom);

  useEffect(() => {
    navigation.setOptions({
      title: selectedArticle?.title,
    });
  }, [navigation, selectedArticle]);

  return (
    <View className="flex-1 justify-center items-center">
      <Text>{selectedArticle?.title}</Text>
      <Text>{selectedArticle?.content}</Text>
    </View>
  );
}
