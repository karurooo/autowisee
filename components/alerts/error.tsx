import React from 'react';
import { SafeAreaView, View, Pressable, Text } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { BottomSheet } from '~/components/bottom_sheet';

type ErrorProps = {
  error?: string | null;
  onRetry?: () => void;
};

export const Error = ({ error, onRetry }: ErrorProps) => {
  const isOpen = useSharedValue(false);

  React.useEffect(() => {
    if (error) {
      isOpen.value = true;
    } else {
      isOpen.value = false;
    }
  }, [error]);

  const toggleSheet = () => {
    isOpen.value = !isOpen.value;
  };

  return (
    <SafeAreaView className="flex-1">
      <BottomSheet isOpen={isOpen} toggleSheet={toggleSheet}>
        <Text className="text-center text-gray-900 dark:text-gray-100">
          {error || 'An unexpected error occurred.'}
        </Text>
        {onRetry && (
          <View className="mt-4 w-full flex-row justify-around">
            <Pressable onPress={onRetry} className="flex-row items-center gap-2">
              <Text className="font-semibold text-purple-600 underline dark:text-purple-400">
                Retry
              </Text>
            </Pressable>
          </View>
        )}
      </BottomSheet>
    </SafeAreaView>
  );
};
