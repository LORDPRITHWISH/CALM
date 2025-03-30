import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Send } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const VoiceChannelsScreen = () => {
  // Voice channels data
  const voiceChannels = [
    {
      id: 1,
      name: 'Gaming Lounge',
      members: '12 online',
      logo: 'https://cdn-icons-png.flaticon.com/512/3612/3612569.png',
    },
    {
      id: 2,
      name: 'Music Room',
      members: '8 online',
      logo: 'https://cdn-icons-png.flaticon.com/512/3659/3659899.png',
    },
    {
      id: 3,
      name: 'Study Group',
      members: '5 online',
      logo: 'https://cdn-icons-png.flaticon.com/512/3976/3976626.png',
    },
    {
      id: 4,
      name: 'General Chat',
      members: '20 online',
      logo: 'https://cdn-icons-png.flaticon.com/512/1041/1041916.png',
    },
  ];

  const router = useRouter();

  const handleJoinChannel = (channelId: number) => {
    console.log(`Joining channel ${channelId}`);
    // Add your join channel logic here
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="flex-1 p-4">
        <Text className="mb-6 text-2xl font-bold text-gray-800">Voice Channels</Text>

        {voiceChannels.map((channel) => (
          <View
            key={channel.id}
            className="mb-4 flex-row items-center rounded-xl bg-white p-4 shadow-sm">
            <Image
              source={{ uri: channel.logo }}
              className="mr-4 h-16 w-16 rounded-lg"
              resizeMode="contain"
            />

            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-800">{channel.name}</Text>
              <Text className="mt-1 text-sm text-gray-500">
                <Send size={18} color="white" /> {channel.members}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => router.navigate('/chat')}
              // onPress={() => handleJoinChannel(channel.id)}
              className="flex-row items-center rounded-lg bg-indigo-600 px-4 py-2"
              activeOpacity={0.8}>
              <Send size={18} color="white" />
              <Text className="ml-2 text-white">Join</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default VoiceChannelsScreen;
