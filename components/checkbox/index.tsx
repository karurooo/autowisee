import React from 'react';
import { Pressable, View, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

type CheckboxProps = {
  isChecked: boolean;
  onToggle: () => void;
  label?: string;
  error?: string;
  errorClassName?: string;
};

export const Checkbox = ({
  isChecked,
  onToggle,
  label,
  error,
  errorClassName = '',
}: CheckboxProps) => {
  const progress = useSharedValue(isChecked ? 1 : 0);

  React.useEffect(() => {
    progress.value = withTiming(isChecked ? 1 : 0, { duration: 200 });
  }, [isChecked]);

  const checkmarkStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scale: progress.value }],
  }));

  const borderStyle = useAnimatedStyle(() => ({
    borderColor: progress.value ? '#6d28d9' : '#cbd5e1',
  }));

  return (
    <>
      <Pressable onPress={onToggle} className="my-2 flex-row items-center">
        <Animated.View
          style={borderStyle}
          className="h-6 w-6 items-center justify-center rounded-md border-2">
          <Animated.View style={checkmarkStyle} className="h-3 w-3 rounded-sm bg-accent" />
        </Animated.View>
        {label && <Text className="mx-4 text-text_primary ">{label}</Text>}
      </Pressable>
      {error && <Text className={`mt-1 text-sm text-error ${errorClassName}`}>{error}</Text>}
    </>
  );
};
