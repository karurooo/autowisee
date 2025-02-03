import 'react-native-reanimated';
import { View, Text } from 'react-native';
import { router } from 'expo-router';
import { Button } from '~/components/buttons/PrimaryButton';
import { Container } from '~/components/shared/Container';

export default function App() {
  const handlePress = () => {
    router.push('/auth/signup');
  };

  return (
    <Container>
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold text-secondary">autowise</Text>
        <Button className="mt-4 w-40 bg-primary" title="Press me" onPress={handlePress} />
      </View>
    </Container>
  );
}
