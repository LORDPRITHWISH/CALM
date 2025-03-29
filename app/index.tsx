import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function App() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-4">
      <ScrollView className="flex-1">
        <View className="items-center gap-4">
          <Text className="mb-2 text-2xl font-bold">THE INDEX</Text>

          <TouchableOpacity
            className="rounded-lg bg-blue-500 px-4 py-2"
            onPress={() => router.push('/aiChat')}>
            <Text className="text-base text-white">AI</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="rounded-lg bg-blue-500 px-4 py-2"
            onPress={() => router.push('/chat')}>
            <Text className="text-base text-white">Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="rounded-lg bg-blue-500 px-4 py-2"
            onPress={() => router.push('/home')}>
            <Text className="text-base text-white">home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="rounded-lg bg-blue-500 px-4 py-2"
            onPress={() => router.push('/signin')}>
            <Text className="text-base text-white">in</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="rounded-lg bg-blue-500 px-4 py-2"
            onPress={() => router.push('/signup')}>
            <Text className="text-base text-white">up</Text>
          </TouchableOpacity>

          <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            className="my-2 h-36 w-36 rounded-lg"
          />

          {/* <Send color="#000" size={24} /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
