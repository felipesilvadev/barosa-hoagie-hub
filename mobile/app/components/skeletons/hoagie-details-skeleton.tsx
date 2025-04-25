import { View } from 'react-native';

export function HoagieDetailsSkeleton() {
  return (
    <View className="flex-1">
      <View className="h-64 w-full animate-pulse bg-zinc-200" />

      <View className="px-4 pt-4">
        <View className="mb-2 h-6 w-1/2 animate-pulse rounded-md bg-zinc-300" />

        <View className="mb-4 h-4 w-1/3 animate-pulse rounded-md bg-zinc-300" />

        <View className="mb-2 h-4 w-2/3 animate-pulse rounded-md bg-zinc-300" />
        <View className="mb-2 h-4 w-1/2 animate-pulse rounded-md bg-zinc-300" />
      </View>

      <View className="mt-6 px-4">
        <View className="mb-4 h-5 w-1/4 animate-pulse rounded-md bg-zinc-300" />

        {Array.from({ length: 3 }).map((_, i) => (
          <View key={i} className="mb-3 rounded-md bg-zinc-100 p-4 dark:bg-zinc-800">
            <View className="mb-2 h-4 w-1/3 animate-pulse rounded-md bg-zinc-300" />
            <View className="h-4 w-2/3 animate-pulse rounded-md bg-zinc-300" />
          </View>
        ))}
      </View>
    </View>
  );
}
