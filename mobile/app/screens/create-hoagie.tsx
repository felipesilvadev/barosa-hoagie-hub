import { useNavigation } from '@react-navigation/native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

import { Input } from '~/components/input';
import { ScreenHeader } from '~/components/screen-header';
import { useAlert } from '~/hooks/use-alert';
import { CreateHoagieData, hoagieApi } from '~/infra/services/hoagie-service';
import { getErrorMessage } from '~/utils/get-error-message';

interface StepOneFields {
  name: string;
}

interface StepTwoFields {
  ingredients: string[];
}

interface StepThreeFields {
  picture?: string;
}

type FormData = StepOneFields & StepTwoFields & StepThreeFields;

const MAX_STEPS = 3;

export function CreateHoagie() {
  const { showAlert } = useAlert();
  const { goBack } = useNavigation();
  const queryClient = useQueryClient();

  const [step, setStep] = useState(1);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [ingredientInput, setIngredientInput] = useState('');

  const { control, handleSubmit, setValue, getValues, watch } = useForm<FormData>({
    defaultValues: {
      name: '',
      ingredients: [],
      picture: undefined,
    },
  });

  const { mutateAsync: createHoagie, isPending } = useMutation({
    mutationFn: async ({ name, ingredients, picture }: CreateHoagieData) => {
      await hoagieApi.createHoagie({ name, ingredients, picture });
    },
    onSuccess: async () => {
      showAlert({
        text1: 'Hoagie successfully created',
      });

      await queryClient.refetchQueries({ queryKey: ['hoagies'] });
      goBack();
    },
    onError: (error) => {
      showAlert({
        type: 'error',
        text1: getErrorMessage(error, 'Unexpected error while creating a new hoagie'),
      });
    },
  });

  const handleBackStep = () => {
    if (step <= 1) return;

    setStep((previousStep) => previousStep - 1);
  };

  const handleNextStep = () => {
    if (step === MAX_STEPS) return;

    setStep((previousStep) => previousStep + 1);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ base64: false });

    if (!result.canceled && result.assets[0]) {
      const manipulated = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 800 } }],
        { compress: 0.3, format: ImageManipulator.SaveFormat.JPEG, base64: true }
      );

      const base64 = `data:image/jpeg;base64,${manipulated.base64}`;
      setValue('picture', base64);
    }
  };

  const addIngredient = () => {
    if (!ingredientInput.trim()) return;

    const updated = [...ingredients, ingredientInput.trim()];
    setIngredients(updated);
    setValue('ingredients', updated);
    setIngredientInput('');
  };

  const removeIngredient = (key: number) => {
    const updated = ingredients.filter((_, index) => index !== key);
    setIngredients(updated);
    setValue('ingredients', updated);
  };

  const onSubmit = (data: FormData) => {
    if (!data.name) {
      showAlert({
        type: 'info',
        text1: 'Name is required',
      });
      return;
    }

    if (!ingredients.length) {
      showAlert({
        type: 'info',
        text1: 'Inform at least 1 ingredient',
      });
      return;
    }

    createHoagie({ name: data.name, ingredients: data.ingredients, picture: data.picture });
  };

  return (
    <SafeAreaView className="flex-1">
      <ScreenHeader title="Create new hoagie" />

      {isPending ? (
        <ActivityIndicator size="large" style={{ flex: 1 }} />
      ) : (
        <ScrollView className="flex-1 px-4 py-6">
          {step === 1 && (
            <View className="mb-4">
              <Controller
                control={control}
                name="name"
                rules={{ required: 'Name is required' }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Name"
                    value={value}
                    onChangeText={onChange}
                    placeholder="New Hoagie"
                  />
                )}
              />
            </View>
          )}

          {step === 2 && (
            <View>
              <View className="mb-4 flex-row items-end gap-2">
                <Input
                  isHorizontally
                  label="Ingredients"
                  value={ingredientInput}
                  onChangeText={setIngredientInput}
                  placeholder="Add ingredient"
                />
                <TouchableOpacity
                  onPress={addIngredient}
                  className="bg-primary h-12 items-center justify-center rounded px-3 py-2">
                  <Text className="font-poppins">Add</Text>
                </TouchableOpacity>
              </View>

              {!!ingredients.length && (
                <View className="mb-4 flex-row flex-wrap items-start gap-2">
                  {ingredients.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      className="rounded border border-zinc-400 p-1"
                      onPress={() => removeIngredient(index)}>
                      <Text className="font-poppins text-sm">{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          )}

          {step === 3 && (
            <View>
              <Text className="font-poppins mb-1 text-sm">Image</Text>
              <TouchableOpacity
                onPress={pickImage}
                className="mb-4 justify-center rounded-md border border-zinc-500 py-2">
                <Text className="font-poppins-medium text-center">Pick an Image</Text>
              </TouchableOpacity>

              {watch('picture') && (
                <Image
                  source={{ uri: getValues('picture') }}
                  className="mb-4 h-48 w-full rounded-md"
                  resizeMode="cover"
                />
              )}
            </View>
          )}

          <View className="flex-row items-center justify-between">
            {step > 1 && (
              <TouchableOpacity onPress={handleBackStep}>
                <Text className="font-poppins text-zinc-700">Back</Text>
              </TouchableOpacity>
            )}
            <Text className="font-poppins-medium text-center text-lg text-zinc-400 ">
              Step {step} of {MAX_STEPS}
            </Text>
            {step < MAX_STEPS ? (
              <TouchableOpacity onPress={handleNextStep}>
                <Text className="font-poppins text-zinc-700">Next</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                className="bg-primary rounded-md px-4 py-2"
                disabled={isPending}>
                <Text className="font-poppins text-center">Submit</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
