import { useInfiniteQuery } from '@tanstack/react-query';
import { FlatList, RefreshControl, Text, View } from 'react-native';

import { Header } from '~/components/header';
import HoagieCard from '~/components/hoagie-card';
import { HoagieListEmpty } from '~/components/hoagie-list-empty';
import { HoagieListLoader } from '~/components/skeletons/hoagie-list-loader';
import { hoagieApi } from '~/infra/services/hoagie-service';

const Home = () => {
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, refetch, isRefetching } =
    useInfiniteQuery({
      queryKey: ['hoagies'],
      initialPageParam: 1,
      queryFn: ({ pageParam }) => hoagieApi.fetchPaginatedHoagies(pageParam),
      getNextPageParam: (lastPage, allPages) => {
        const totalLoaded = allPages.flatMap((p) => p.hoagies).length;
        return totalLoaded < lastPage.total ? allPages.length + 1 : undefined;
      },
    });

  const total = data?.pages[0]?.total ?? 0;
  const hoagies = data?.pages.flatMap((page) => page.hoagies) || [];

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <View className="flex-1">
      <Header />

      {isLoading ? (
        <View className="px-2 pt-5">
          <HoagieListLoader count={7} />
        </View>
      ) : (
        <FlatList
          data={hoagies}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HoagieCard hoagie={item} />}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.4}
          showsVerticalScrollIndicator={false}
          initialNumToRender={7}
          refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
          contentContainerStyle={{ paddingHorizontal: 8, paddingTop: 20, paddingBottom: 48 }}
          ListEmptyComponent={<HoagieListEmpty />}
          ListHeaderComponent={
            hoagies.length ? (
              <View className="mb-2 items-end">
                <Text className="font-poppins text-[10px] text-zinc-400">
                  {total} hoagie(s) found
                </Text>
              </View>
            ) : null
          }
          ListFooterComponent={
            isFetchingNextPage ? (
              <View className="mt-4">
                <HoagieListLoader count={2} />
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
};

export { Home };
