import {useInfiniteQuery} from '@tanstack/react-query';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {Article} from '@/types';
import {selectedArticleAtom} from '@/atoms';
import {useAtom} from 'jotai';
import {navigate} from '@/lib/navigation';
import {fetchArticles} from '@/lib/fetch';

type RenderProps = {
  article: Article;
};

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

  const renderItem = ({article}: RenderProps) => {
    const onPress = () => {
      setSelectedArticle(article);
      navigate('Details');
    };

    return (
      <TouchableHighlight onPress={onPress}>
        <Text>{article?.title ?? ''}</Text>
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
    // Show loader when fetching first page data.
    return <ActivityIndicator size={'large'} />;
  }

  const flatData = data?.pages.flatMap(page => page.articles) ?? [];

  return (
    <View style={{flex: 1, paddingBottom: 20}}>
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
