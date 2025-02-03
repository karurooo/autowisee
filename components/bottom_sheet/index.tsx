import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const INITIAL_TRANSLATE_Y = -SCREEN_HEIGHT * 0.1;
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT / 2;

interface BottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isVisible,
  onClose,
  title = 'Error',
  message,
}) => {
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const context = useSharedValue({ y: 0 });

  useEffect(() => {
    if (isVisible) {
      translateY.value = withSpring(INITIAL_TRANSLATE_Y, { damping: 30 });
    } else {
      translateY.value = withTiming(SCREEN_HEIGHT, { duration: 300 });
    }
  }, [isVisible]);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
      translateY.value = Math.min(translateY.value, INITIAL_TRANSLATE_Y);
    })
    .onEnd(() => {
      if (translateY.value > -SCREEN_HEIGHT * 0.4) {
        translateY.value = withSpring(SCREEN_HEIGHT, { damping: 30, stiffness: 150 }, () => {
          runOnJS(onClose)();
        });
      } else {
        translateY.value = withSpring(INITIAL_TRANSLATE_Y, { damping: 30, stiffness: 150 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <TouchableOpacity
        className="absolute bottom-0 left-0 right-0 top-0 bg-black/50"
        onPress={() => {
          translateY.value = withTiming(SCREEN_HEIGHT, { duration: 300 }, () => {
            runOnJS(onClose)();
          });
        }}
        activeOpacity={0.5}
      />

      {/* Bottom Sheet */}
      <GestureDetector gesture={gesture}>
        <Animated.View
          className="absolute w-full rounded-t-3xl bg-white p-5"
          style={[
            animatedStyle,
            {
              height: SCREEN_HEIGHT,
              top: SCREEN_HEIGHT - 160,
            },
          ]}>
          {/* Drag Handle */}
          <View className="my-2 h-1 w-20 self-center rounded-full bg-gray-500" />

          <Text className="mb-2 text-center text-2xl font-bold text-error">{title}!</Text>
          <Text className="text-md mb-5 text-center">{message}</Text>

          {/* Close Button */}
          <TouchableOpacity
            className="rounded-lg bg-error px-5 py-2"
            onPress={() => {
              translateY.value = withTiming(SCREEN_HEIGHT, { duration: 300 }, () => {
                runOnJS(onClose)();
              });
            }}>
            <Text className="text-center text-lg font-bold text-white">Close</Text>
          </TouchableOpacity>
        </Animated.View>
      </GestureDetector>
    </>
  );
};

export default BottomSheet;
