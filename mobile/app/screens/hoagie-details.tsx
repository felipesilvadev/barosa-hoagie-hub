import { useRoute } from '@react-navigation/native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { Input } from '~/components/input';
import { ScreenHeader } from '~/components/screen-header';
import { Hoagie, hoagieApi } from '~/infra/services/hoagie-service';

export type HoagieDetailsParams = {
  hoagie_id: string;
};

export function HoagieDetails() {
  const { params } = useRoute();
  const { hoagie_id } = params as HoagieDetailsParams;

  const queryClient = useQueryClient();

  const [comment, setComment] = useState('');

  const { data: hoagieData } = useQuery({
    queryKey: ['hoagie', hoagie_id],
    queryFn: () => hoagieApi.getHoagieDetails(hoagie_id),
  });

  const { mutateAsync: addComment } = useMutation({
    mutationFn: (text: string) => hoagieApi.addComment({ hoagie_id, text }),
    onMutate: async (newCommentText) => {
      await queryClient.cancelQueries({ queryKey: ['hoagie', hoagie_id] });

      const previous = queryClient.getQueryData(['hoagie', hoagie_id]);

      queryClient.setQueryData(['hoagie', hoagie_id], (old: Hoagie) => {
        return {
          ...old,
          comments: [
            {
              id: `optimistic-${Date.now()}`,
              text: newCommentText,
              createdAt: new Date().toISOString(),
              user: { id: 'me', name: 'You' },
              optimistic: true,
            },
            ...(old.comments ?? []),
          ],
        };
      });

      return { previous };
    },
    onError: (_err, _newComment, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['hoagie', hoagie_id], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['hoagie', hoagie_id] });
    },
  });

  const handleSendComment = () => {
    if (comment.trim()) {
      addComment(comment.trim());
      setComment('');
    }
  };

  if (!hoagieData) return null;

  const { picture, name, ingredients, creator, comments } = hoagieData;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1">
      <SafeAreaView className="flex-1">
        <ScreenHeader title="Hoagie details" />

        <ScrollView
          className="flex-1"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {picture ? (
            <Image source={{ uri: picture }} className="h-64 w-full object-cover" />
          ) : (
            <View className="h-64 w-full items-center justify-center bg-zinc-200">
              <Text className="font-poppins text-zinc-500">No image available</Text>
            </View>
          )}

          <View className="px-4 pt-4">
            <Text className="font-poppins-medium text-xl text-zinc-800 ">{name}</Text>
            <Text className="font-poppins text-sm text-zinc-500">By {creator.name}</Text>
            <Text className="font-poppins mt-3 text-sm text-zinc-500">
              Ingredients: {ingredients.join(', ')}
            </Text>
          </View>

          <View className="mt-6 pb-10">
            <Text className="font-poppins-medium mb-2 pl-4 text-zinc-800">
              Comments ({comments?.length})
            </Text>

            <FlatList
              data={comments}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View className="bg-zinc-200 px-4 py-3">
                  <Text className="font-poppins-medium text-xs font-semibold text-zinc-600">
                    {item.user.name}{' '}
                    <Text className="font-poppins text-zinc-400">
                      {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                    </Text>
                  </Text>
                  <Text className="font-poppins text-sm text-zinc-700 ">{item.text}</Text>
                </View>
              )}
              scrollEnabled={false}
              ListEmptyComponent={
                <Text className="font-poppins pl-4 text-sm text-zinc-400">No comments yet.</Text>
              }
            />

            <View className="mt-4 flex-row items-center gap-2 px-4">
              <Input value={comment} onChangeText={setComment} placeholder="Write a comment..." />

              <TouchableOpacity
                onPress={handleSendComment}
                className="bg-primary h-12 items-center justify-center rounded px-3 py-2">
                <Text className="font-poppins">Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
