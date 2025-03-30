import { Send } from 'lucide-react-native';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const VideoCallUI = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [callActive, setCallActive] = useState(true);
  const [callDuration, setCallDuration] = useState(0); // in seconds

  React.useEffect(() => {
    // Simulate call timer
    if (!callActive) return;

    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [callActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Mock user data
  const user = {
    name: 'Alex Johnson',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  };

  const otherUser = {
    name: 'Sarah Miller',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      {/* Main container */}
      <View className="relative flex-1">
        {/* Other user's video placeholder */}
        <View className="absolute inset-0 items-center justify-center bg-gray-800">
          {callActive ? (
            <>
              <Image source={{ uri: otherUser.avatar }} className="mb-4 h-40 w-40 rounded-full" />
              <Text className="text-2xl font-bold text-white">{otherUser.name}</Text>
              <Text className="mt-2 text-gray-300">{formatTime(callDuration)}</Text>
            </>
          ) : (
            <Text className="text-xl text-white">Call ended</Text>
          )}
        </View>

        {/* User's video placeholder (small overlay) */}
        {isVideoOn && callActive && (
          <View className="absolute bottom-28 right-4 h-32 w-24 items-center justify-center overflow-hidden rounded-lg border-2 border-gray-600 bg-gray-700">
            <Image source={{ uri: user.avatar }} className="h-16 w-16 rounded-full" />
          </View>
        )}

        {/* Call controls */}
        {callActive ? (
          <View className="absolute bottom-8 left-0 right-0 flex-row justify-center space-x-6 px-4">
            {/* Mute button */}
            <TouchableOpacity
              onPress={() => setIsMuted(!isMuted)}
              className="h-14 w-14 items-center justify-center rounded-full bg-gray-700/80">
              <Send size={18} color="white" />
            </TouchableOpacity>

            {/* Video button */}
            <TouchableOpacity
              onPress={() => setIsVideoOn(!isVideoOn)}
              className="h-14 w-14 items-center justify-center rounded-full bg-gray-700/80">
              <Send size={18} color="white" />
            </TouchableOpacity>

            {/* Speaker button */}
            <TouchableOpacity
              onPress={() => setIsSpeakerOn(!isSpeakerOn)}
              className="h-14 w-14 items-center justify-center rounded-full bg-gray-700/80">
              <Send size={18} color="white" />
            </TouchableOpacity>

            {/* End call button */}
            <TouchableOpacity
              onPress={() => setCallActive(false)}
              className="h-14 w-14 items-center justify-center rounded-full bg-red-600">
              <Send size={18} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <View className="absolute bottom-8 left-0 right-0 items-center">
            <TouchableOpacity
              onPress={() => {
                setCallActive(true);
                setCallDuration(0);
              }}
              className="h-16 w-16 items-center justify-center rounded-full bg-green-600">
              <Send size={18} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default VideoCallUI;
