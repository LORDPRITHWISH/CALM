import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Phone,
  Speaker,
  SpeakerOff,
} from 'lucide-react-native';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const VideoCallUI = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [callActive, setCallActive] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [voiceLevel, setVoiceLevel] = useState(0);
  const [otherUserVoiceLevel, setOtherUserVoiceLevel] = useState(0);

  const pulseAnim = new Animated.Value(1);
  const waveAnim = new Animated.Value(0);
  const voiceWaveAnim = new Animated.Value(0);

  useEffect(() => {
    if (!callActive) return;

    const voiceInterval = setInterval(() => {
      if (!isMuted) {
        setVoiceLevel(Math.random() * 0.5 + 0.5);
      } else {
        setVoiceLevel(0);
      }

      setOtherUserVoiceLevel(Math.random() * 0.7 + 0.3);
    }, 300);

    return () => clearInterval(voiceInterval);
  }, [callActive, isMuted]);

  useEffect(() => {
    if (!callActive) return;

    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [callActive]);

  useEffect(() => {
    if (!callActive) return;

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [callActive]);

  useEffect(() => {
    if (!callActive) return;

    Animated.loop(
      Animated.timing(waveAnim, {
        toValue: 1,
        duration: 1600,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [callActive]);

  useEffect(() => {
    if (!callActive) return;

    Animated.loop(
      Animated.sequence([
        Animated.timing(voiceWaveAnim, {
          toValue: 1,
          duration: 1250,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(voiceWaveAnim, {
          toValue: 0,
          duration: 1250,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [callActive]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const user = {
    name: 'Alex Johnson',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  };

  const otherUser = {
    name: 'Sarah Miller',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  };

  const renderVoiceBars = (level, count = 5) => {
    return Array.from({ length: count }).map((_, i) => {
      const barHeight = ((level * (i + 1)) / count) * 20;
      return (
        <View
          key={i}
          className="mx-0.5 rounded-sm bg-blue-500"
          style={{
            width: 4,
            height: barHeight,
          }}
        />
      );
    });
  };

  const voiceWaveInterpolation = voiceWaveAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -15, 0],
  });

  return (
    <SafeAreaView className="bg-ivory-50 flex-1">
      <View className="absolute left-0 right-0 top-0 h-2/5 rounded-b-3xl bg-blue-600" />

      <View className="relative flex-1">
        <View className="absolute bottom-44 left-5 right-5 top-16 items-center justify-center rounded-2xl bg-white shadow-md">
          {callActive ? (
            <>
              <Animated.View
                className="mb-5"
                style={[
                  { transform: [{ scale: pulseAnim }] },
                  otherUserVoiceLevel > 0.5 && { transform: [{ scale: pulseAnim }] },
                ]}>
                <Image
                  source={{ uri: otherUser.avatar }}
                  className="h-36 w-36 rounded-full border-4"
                  style={{ borderColor: otherUserVoiceLevel > 0.5 ? '#64b5f6' : '#e0e0e0' }}
                />
              </Animated.View>

              <Text className="text-2xl font-bold text-gray-800">{otherUser.name}</Text>
              <Text className="mt-2 text-gray-500">{formatTime(callDuration)}</Text>

              <View className="mt-5 min-h-8 flex-row items-center">
                {renderVoiceBars(otherUserVoiceLevel)}
              </View>
            </>
          ) : (
            <Text className="text-xl text-gray-800">Call ended</Text>
          )}
        </View>

        {isVideoOn && callActive && (
          <Animated.View
            className="absolute bottom-44 right-5 h-36 w-24 items-center justify-center overflow-hidden rounded-xl border-2 border-gray-200 bg-white shadow-sm"
            style={{ transform: [{ translateY: voiceWaveInterpolation }] }}>
            <Image source={{ uri: user.avatar }} className="h-16 w-16 rounded-full" />

            {!isMuted && (
              <View className="absolute bottom-2 flex-row">{renderVoiceBars(voiceLevel, 3)}</View>
            )}
          </Animated.View>
        )}

        {callActive ? (
          <View className="absolute bottom-10 left-0 right-0 flex-row justify-center gap-4 px-5">
            <TouchableOpacity
              onPress={() => setCallActive(false)}
              className="h-14 w-14 items-center justify-center rounded-full bg-red-500 shadow-sm">
              <PhoneOff size={24} className="text-white" />
            </TouchableOpacity>
          </View>
        ) : (
          <View className="absolute bottom-10 left-0 right-0 items-center">
            <TouchableOpacity
              onPress={() => {
                setCallActive(true);
                setCallDuration(0);
              }}
              className="h-16 w-16 items-center justify-center rounded-full bg-green-500 shadow-sm">
              <Phone size={24} className="text-white" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default VideoCallUI;
