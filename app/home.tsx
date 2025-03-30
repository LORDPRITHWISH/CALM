import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Send, Video, MessageSquare, UserCheck } from 'lucide-react-native';
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

  // Therapists data
  const therapists = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cognitive Behavioral Therapy',
      availability: 'Available Now',
      image: 'https://cdn-icons-png.flaticon.com/512/3135/3135789.png',
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Depression & Anxiety',
      availability: 'Available in 30 min',
      image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Trauma & PTSD',
      availability: 'Available Tomorrow',
      image: 'https://cdn-icons-png.flaticon.com/512/3135/3135823.png',
    },
  ];

  const router = useRouter();

  // User status - would come from your user state management
  const isDepressed = true; // Toggle this for testing different layouts

  const handleJoinChannel = (channelId: number) => {
    console.log(`Joining channel ${channelId}`);
    // Add your join channel logic here
  };

  const handleAIVideoCall = () => {
    console.log('Starting AI video call');
    // Navigate to AI video call screen
    router.navigate('/aiui');
  };

  const handleAITextChat = () => {
    console.log('Starting AI text chat');
    // Navigate to AI text chat screen
    router.navigate('/chat');
  };

  const handleConnectTherapist = (therapistId: number) => {
    console.log(`Connecting with therapist ${therapistId}`);
    // Navigate to therapist chat/call screen
    router.navigate(`/therapist/${therapistId}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="flex-1 p-4">
        {/* Main Title */}
        <Text className="mb-6 text-2xl font-bold text-gray-800">Support Center</Text>

        {/* AI Interaction Buttons - Different layout based on user status */}
        {isDepressed ? (
          // Horizontal layout for depressed users (at the top)
          <View className="mb-8 flex-row justify-between space-x-4">
            <TouchableOpacity
              onPress={handleAIVideoCall}
              className="m-5 flex-1 items-center justify-center rounded-xl bg-blue-600 p-4  shadow-md"
              activeOpacity={0.8}>
              <Video size={32} color="white" />
              <Text className="mt-2 text-center text-lg font-semibold text-white">
                Video Call with AI Assistant
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleAITextChat}
              className="m-5 flex-1 items-center justify-center rounded-xl bg-indigo-600 p-4  shadow-md"
              activeOpacity={0.8}>
              <MessageSquare size={32} color="white" />
              <Text className="mt-2 text-center text-lg font-semibold text-white">
                Text Chat with AI Assistant
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Vertical layout in the middle (for non-depressed users)
          <View className="mb-8 space-y-4">
            <TouchableOpacity
              onPress={handleAIVideoCall}
              className="items-center justify-center rounded-xl bg-blue-600 p-6 shadow-md"
              activeOpacity={0.8}>
              <Video size={40} color="white" />
              <Text className="mt-3 text-center text-xl font-semibold text-white">
                Video Call with AI Assistant
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleAITextChat}
              className="items-center justify-center rounded-xl bg-indigo-600 p-6 shadow-md"
              activeOpacity={0.8}>
              <MessageSquare size={40} color="white" />
              <Text className="mt-3 text-center text-xl font-semibold text-white">
                Text Chat with AI Assistant
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Therapist Section - Always shown but emphasized for depressed users */}
        <View className={`mb-6 ${isDepressed ? 'mt-2' : 'mt-8'}`}>
          <Text
            className={`mb-4 text-xl font-bold text-gray-800 ${isDepressed ? 'text-red-600' : ''}`}>
            {isDepressed ? 'Recommended Professional Support' : 'Available Therapists'}
          </Text>

          {therapists.map((therapist) => (
            <View
              key={therapist.id}
              className={`mb-4 flex-row items-center rounded-xl ${isDepressed ? 'bg-red-50' : 'bg-white'} p-4 shadow-sm`}>
              <Image
                source={{ uri: therapist.image }}
                className="mr-4 h-16 w-16 rounded-full"
                resizeMode="cover"
              />

              <View className="flex-1">
                <Text className="text-lg font-semibold text-gray-800">{therapist.name}</Text>
                <Text className="text-sm text-gray-600">{therapist.specialty}</Text>
                <Text
                  className={`mt-1 text-sm ${therapist.availability.includes('Now') ? 'font-semibold text-green-600' : 'text-gray-500'}`}>
                  {therapist.availability}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => handleConnectTherapist(therapist.id)}
                className={`flex-row items-center rounded-lg ${isDepressed ? 'bg-red-600' : 'bg-green-600'} px-4 py-2`}
                activeOpacity={0.8}>
                <UserCheck size={18} color="white" />
                <Text className="ml-2 text-white">Connect</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Voice Channels Section */}
        <Text className="mb-4 text-xl font-bold text-gray-800">Community Voice Channels</Text>

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
              <Text className="mt-1 text-sm text-gray-500">{channel.members}</Text>
            </View>

            <TouchableOpacity
              onPress={() => router.navigate('/chat')}
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
