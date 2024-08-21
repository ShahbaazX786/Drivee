import { StatusBar, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <Text className='text-8xl'>Bismillah</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
