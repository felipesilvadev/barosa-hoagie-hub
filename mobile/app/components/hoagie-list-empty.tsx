import { Text, View, TouchableOpacity } from 'react-native';

export function HoagieListEmpty() {
  return (
    <View className="flex-1 items-center justify-center py-10">
      <Text className="font-poppins mb-3 text-sm text-zinc-500">No hoagies found.</Text>

      <TouchableOpacity
        onPress={() => console.log('Navigate to CreateHoagie')}
        className="rounded border border-zinc-500 px-4 py-2">
        <Text className="font-poppins text-sm">Create Hoagie</Text>
      </TouchableOpacity>
    </View>
  );
}
