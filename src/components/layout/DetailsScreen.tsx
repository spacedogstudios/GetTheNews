import {Image, StyleSheet, Text, View} from 'react-native';
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

  console.log(selectedArticle?.urlToImage);

  return (
    <View className="flex-1 w-16 h-16">
      <Text className="text-blue-200">{selectedArticle?.title}</Text>
      <Text>{selectedArticle?.content}</Text>
      {selectedArticle?.urlToImage && (
        <View className="flex-1 w-16 h-16">
          <Image
            source={{
              uri: selectedArticle?.urlToImage,
            }}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>
      )}
    </View>
  );
}
