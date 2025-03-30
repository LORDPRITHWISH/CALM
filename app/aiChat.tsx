import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Phone,
  Speaker,
  MessageSquare,
} from 'lucide-react-native';
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Tts from 'react-native-tts';
import Voice from '@react-native-voice/voice';

const VideoCallUI = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [callActive, setCallActive] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [voiceLevel, setVoiceLevel] = useState(0);
  const [otherUserVoiceLevel, setOtherUserVoiceLevel] = useState(0);

  // TTS and STT states
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: 'Hi there! How can I help you today?', sender: 'ai' },
  ]);
  const [inputText, setInputText] = useState('');
  const [showChat, setShowChat] = useState(false);

  const scrollViewRef = useRef();

  const pulseAnim = new Animated.Value(1);
  const waveAnim = new Animated.Value(0);
  const voiceWaveAnim = new Animated.Value(0);

  // Initialize TTS
  useEffect(() => {
    Tts.setDefaultLanguage('en-US');
    Tts.setDefaultRate(0.5);
    Tts.setDefaultPitch(1.0);

    Tts.addEventListener('tts-start', () => setIsSpeaking(true));
    Tts.addEventListener('tts-finish', () => setIsSpeaking(false));
    Tts.addEventListener('tts-cancel', () => setIsSpeaking(false));

    return () => {
      Tts.removeAllListeners('tts-start');
      Tts.removeAllListeners('tts-finish');
      Tts.removeAllListeners('tts-cancel');
    };
  }, []);

  // Initialize Voice recognition
  useEffect(() => {
    // Set up voice recognition
    Voice.onSpeechStart = () => setIsListening(true);
    Voice.onSpeechEnd = () => setIsListening(false);
    Voice.onSpeechResults = (e) => {
      if (e.value && e.value.length > 0) {
        setRecognizedText(e.value[0]);
        setInputText(e.value[0]);
      }
    };
    Voice.onSpeechError = (e) => {
      console.error(e);
      setIsListening(false);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  // Simulate AI response after user message
  const simulateAIResponse = (userMessage) => {
    // Simple responses based on user input
    let aiResponse = '';

    if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
      aiResponse = "Hello! It's nice to hear from you. How are you feeling today?";
    } else if (userMessage.toLowerCase().includes('how are you')) {
      aiResponse = "I'm functioning well, thank you for asking! How can I assist you today?";
    } else if (
      userMessage.toLowerCase().includes('help') ||
      userMessage.toLowerCase().includes('support')
    ) {
      aiResponse =
        "I'm here to support you. Would you like to talk about specific feelings or situations that are challenging you?";
    } else if (
      userMessage.toLowerCase().includes('sad') ||
      userMessage.toLowerCase().includes('depress')
    ) {
      aiResponse =
        "I'm sorry to hear you're feeling down. Remember that these feelings are temporary, and it's important to be kind to yourself. Would you like to discuss some coping strategies?";
    } else if (
      userMessage.toLowerCase().includes('anxious') ||
      userMessage.toLowerCase().includes('worry')
    ) {
      aiResponse =
        'Anxiety can be difficult to manage. Have you tried any breathing exercises? Taking slow, deep breaths can help calm your nervous system.';
    } else {
      aiResponse =
        "Thank you for sharing. I'm here to listen and support you. Would you like to tell me more about that?";
    }

    return aiResponse;
  };

  // Start voice recognition
  const startListening = async () => {
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  // Stop voice recognition and process the recognized text
  const stopListening = async () => {
    try {
      await Voice.stop();
      if (recognizedText) {
        sendMessage(recognizedText);
        setRecognizedText('');
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Send a message (either from text input or speech recognition)
  const sendMessage = (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage = { id: Date.now(), text, sender: 'user' };
    setChatMessages((prev) => [...prev, userMessage]);
    setInputText('');

    // Simulate AI thinking...
    setTimeout(() => {
      const aiResponse = simulateAIResponse(text);
      const aiMessage = { id: Date.now() + 1, text: aiResponse, sender: 'ai' };
      setChatMessages((prev) => [...prev, aiMessage]);

      // Speak the AI's response
      if (isSpeakerOn) {
        Tts.speak(aiResponse);
      }

      // Scroll to bottom of chat
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 1000);
  };

  // Cancel TTS
  const stopSpeaking = () => {
    Tts.stop();
  };

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
    name: 'Sarah Miller (AI Support)',
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
        {!showChat ? (
          // Video Call View
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

                {isListening && (
                  <View className="mt-6">
                    <Text className="text-blue-500">Listening...</Text>
                    {recognizedText ? (
                      <Text className="mt-2 text-gray-700">{recognizedText}</Text>
                    ) : null}
                  </View>
                )}

                {isSpeaking && (
                  <View className="mt-4 flex-row items-center">
                    <Text className="mr-2 text-blue-600">Speaking</Text>
                    {renderVoiceBars(0.8, 3)}
                  </View>
                )}
              </>
            ) : (
              <Text className="text-xl text-gray-800">Call ended</Text>
            )}
          </View>
        ) : (
          // Chat View
          <View className="absolute bottom-44 left-5 right-5 top-16 rounded-2xl bg-white shadow-md">
            <View className="border-b border-gray-200 p-4">
              <View className="flex-row items-center">
                <Image source={{ uri: otherUser.avatar }} className="h-10 w-10 rounded-full" />
                <Text className="ml-3 text-lg font-semibold">{otherUser.name}</Text>
              </View>
            </View>

            <ScrollView
              ref={scrollViewRef}
              className="flex-1 p-4"
              contentContainerStyle={{ paddingBottom: 10 }}>
              {chatMessages.map((message) => (
                <View
                  key={message.id}
                  className={`max-w-4/5 mb-3 rounded-xl p-3 ${
                    message.sender === 'user'
                      ? 'ml-auto self-end bg-blue-500'
                      : 'mr-auto bg-gray-200'
                  }`}>
                  <Text className={`${message.sender === 'user' ? 'text-white' : 'text-gray-800'}`}>
                    {message.text}
                  </Text>
                </View>
              ))}
            </ScrollView>

            <View className="border-t border-gray-200 p-3">
              <View className="flex-row items-center">
                <TextInput
                  className="mr-3 flex-1 rounded-full border border-gray-300 px-4 py-2"
                  value={inputText}
                  onChangeText={setInputText}
                  placeholder="Type a message..."
                  onSubmitEditing={() => sendMessage(inputText)}
                />

                <TouchableOpacity
                  onPress={isListening ? stopListening : startListening}
                  className={`mr-2 h-10 w-10 items-center justify-center rounded-full ${
                    isListening ? 'bg-red-500' : 'bg-blue-500'
                  }`}>
                  <Mic size={20} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => sendMessage(inputText)}
                  className="h-10 w-10 items-center justify-center rounded-full bg-blue-500"
                  disabled={!inputText.trim()}>
                  <Send size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {isVideoOn && callActive && !showChat && (
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
          <View className="absolute bottom-10 left-0 right-0 flex-row justify-center space-x-4">
            <TouchableOpacity
              onPress={() => setIsMuted(!isMuted)}
              className={`h-12 w-12 items-center justify-center rounded-full ${
                isMuted ? 'bg-red-500' : 'bg-gray-200'
              }`}>
              {isMuted ? <MicOff size={22} color="white" /> : <Mic size={22} color="#666" />}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setIsVideoOn(!isVideoOn)}
              className={`h-12 w-12 items-center justify-center rounded-full ${
                !isVideoOn ? 'bg-red-500' : 'bg-gray-200'
              }`}>
              {!isVideoOn ? <VideoOff size={22} color="white" /> : <Video size={22} color="#666" />}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setCallActive(false)}
              className="h-14 w-14 items-center justify-center rounded-full bg-red-500 shadow-sm">
              <PhoneOff size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setIsSpeakerOn(!isSpeakerOn)}
              className={`h-12 w-12 items-center justify-center rounded-full ${
                isSpeakerOn ? 'bg-blue-500' : 'bg-gray-200'
              }`}>
              {isSpeakerOn ? (
                <Speaker size={22} color="white" />
              ) : (
                <SpeakerOff size={22} color="#666" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowChat(!showChat)}
              className={`h-12 w-12 items-center justify-center rounded-full ${
                showChat ? 'bg-blue-500' : 'bg-gray-200'
              }`}>
              <MessageSquare size={22} color={showChat ? 'white' : '#666'} />
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
              <Phone size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default VideoCallUI;
