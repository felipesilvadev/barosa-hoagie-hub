import { View } from 'react-native';

export function HoagieCardSkeleton() {
  return (
    <View className="mb-4 w-full rounded-2xl bg-transparent p-4 dark:bg-zinc-800">
      <View className="mb-2 h-4 w-1/2 animate-pulse rounded-md bg-zinc-300 dark:bg-zinc-700" />
      <View className="mb-1 h-3 w-2/3 animate-pulse rounded-md bg-zinc-300 dark:bg-zinc-700" />
      <View className="h-3 w-1/3 animate-pulse rounded-md bg-zinc-300 dark:bg-zinc-700" />
    </View>
  );
}
