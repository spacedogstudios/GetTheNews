import {useInfiniteQuery} from '@tanstack/react-query';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {Article} from '@/types';
import {selectedArticleAtom} from '@/atoms';
import {useAtom} from 'jotai';
import {navigate} from '@/lib/navigation';
import {fetchArticles} from '@/lib/fetch';

export default function Articles() {
  const [, setSelectedArticle] = useAtom(selectedArticleAtom);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: fetchArticles,
    initialPageParam: 1,
    getNextPageParam: lastPage => lastPage.nextCursor,
  });

  const renderItem = ({item}: ListRenderItemInfo<Article>) => {
    if (item?.title.search(/\[Removed\]/) === 0) {
      return null;
    }

    const onPress = () => {
      setSelectedArticle(item);
      navigate('Details');
    };

    console.log('i: ' + item?.title);

    return (
      <TouchableHighlight onPress={onPress}>
        <Text>{item?.title ?? ''}</Text>
      </TouchableHighlight>
    );
  };

  const ListEndLoader = () => {
    if (!isFetchingNextPage) return null;

    return <ActivityIndicator size={'small'} />;
  };

  if (status === 'error') {
    return <Text>Error: {error.message}</Text>;
  }

  if (isFetching && !isFetchingNextPage) {
    return <ActivityIndicator size={'large'} />;
  }

  const flatData = data?.pages.flatMap(page => page.articles) ?? [];

  return (
    <View className="flex-1 pb-8">
      <FlatList
        data={flatData}
        renderItem={renderItem}
        onEndReached={() => !isFetching && hasNextPage && fetchNextPage()}
        onEndReachedThreshold={0.8}
        ListFooterComponent={ListEndLoader}
      />
    </View>
  );
}
