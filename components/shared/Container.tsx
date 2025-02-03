import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface ContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
}

export const Container = ({ children, scrollable = false }: ContainerProps) => {
  return (
    <SafeAreaView className="flex-1">
      {scrollable ? (
        <KeyboardAwareScrollView
          className="h-full w-full rounded-lg py-2"
          contentContainerStyle={{ flexGrow: 1 }}
          enableOnAndroid={true} // Enable on Android
          extraScrollHeight={20} // Add extra padding for the keyboard
        >
          {children}
        </KeyboardAwareScrollView>
      ) : (
        <View className="h-full w-full rounded-lg py-2">{children}</View>
      )}
    </SafeAreaView>
  );
};
