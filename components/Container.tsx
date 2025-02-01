import { SafeAreaView, View } from 'react-native';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView className="flex-1">
      <View className=" h-full w-full rounded-lg p-4 ">{children}</View>
    </SafeAreaView>
  );
};
