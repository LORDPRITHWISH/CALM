import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { Send, User, Bot } from 'lucide-react-native';
import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Alert,
} from 'react-native';

export default function ChatScreen() {
  const route = useRoute();
  const [messages, setMessages] = useState([
    {
      id: '1',
      content: "Hello! I'm your emotional support companion. How are you feeling today?",
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef(null);
  const inputRef = useRef(null);
  const { userId, traits = [] } = route.params; // Added default empty array for traits

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    });
    return () => {
      showSubscription.remove();
    };
  }, []);

  const getAuthToken = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found');
      }
      return token;
    } catch (error) {
      console.error('Error getting token:', error);
      throw error; // Re-throw to handle in calling function
    }
  };

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };

    // Optimistic update
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const token = await getAuthToken();
      console.log(input);
      // Ensure traits is always an array
      const safeTraits = Array.isArray(traits) ? traits : [];

      const response = await axios.post(
        'https://m40cw5th-5000.inc1.devtunnels.ms/api/v1/emotional_support_chat',
        {
          userId,
          message: input,
          traits: safeTraits,
          chatHistory: messages
            .filter((m) => m.role === 'user' || m.role === 'assistant')
            .slice(-5)
            .map((m) => ({
              role: m.role,
              content: m.content,
              timestamp: m.timestamp,
            })),
          isFirstMessage: messages.filter((m) => m.role === 'user').length === 0,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (!response.data?.success) {
        throw new Error(response.data?.error || 'Invalid response from server');
      }

      const assistantMessage = {
        id: `ai-${Date.now()}`,
        content: response.data.message,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('API Error:', error);

      // Remove optimistic update
      setMessages((prev) => prev.filter((m) => m.id !== userMessage.id));
      setInput(userMessage.content);

      // Show appropriate error message
      let errorMessage = 'Failed to send message';
      if (error.response) {
        if (error.response.status === 404) {
          errorMessage = 'The chat service is currently unavailable';
        } else {
          errorMessage = error.response.data?.message || errorMessage;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      Alert.alert('Error', errorMessage, [
        { text: 'OK', onPress: () => {} },
        { text: 'Retry', onPress: handleSend },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const renderMessage = ({ item }) => {
    const isUser = item.role === 'user';

    return (
      <View
        style={[styles.messageContainer, isUser ? styles.userMessage : styles.assistantMessage]}>
        <View style={styles.messageHeader}>
          <View style={[styles.avatar, isUser ? styles.userAvatar : styles.assistantAvatar]}>
            {isUser ? <User size={14} color="white" /> : <Bot size={14} color="#374151" />}
          </View>
          <Text style={[styles.senderText, isUser ? styles.userSender : styles.assistantSender]}>
            {isUser ? 'You' : 'HopeBot'}
          </Text>
        </View>
        <Text style={isUser ? styles.userText : styles.assistantText}>{item.content}</Text>
        <Text style={[styles.timeText, isUser ? styles.userTime : styles.assistantTime]}>
          {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Emotional Support Companion</Text>
        </View>

        <View style={styles.messagesContainer}>
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.messagesList}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Share how you're feeling..."
            placeholderTextColor="#9CA3AF"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={handleSend}
            multiline
            maxLength={1000}
          />
          <TouchableOpacity
            onPress={handleSend}
            style={[styles.sendButton, input.trim() === '' && styles.disabledButton]}
            disabled={input.trim() === '' || isLoading}>
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Send size={18} color="white" />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 8,
    marginBottom: 8,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesList: {
    paddingVertical: 10,
    paddingBottom: 20, // Extra space at bottom
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: Platform.OS === 'ios' ? 16 : 8,
  },
  input: {
    flex: 1,
    paddingHorizontal: 4,
    paddingVertical: 8,
    color: '#374151',
  },
  sendButton: {
    marginLeft: 8,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#3b82f6',
  },
  disabledButton: {
    backgroundColor: '#93c5fd',
  },
  messageContainer: {
    padding: 12,
    marginVertical: 4,
    maxWidth: '80%',
    borderRadius: 16,
  },
  userMessage: {
    alignSelf: 'flex-end',
    borderTopRightRadius: 0,
    backgroundColor: '#3b82f6',
  },
  assistantMessage: {
    alignSelf: 'flex-start',
    borderTopLeftRadius: 0,
    backgroundColor: '#e5e7eb',
  },
  messageHeader: {
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 8,
    height: 24,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  userAvatar: {
    backgroundColor: '#1e40af',
  },
  assistantAvatar: {
    backgroundColor: '#d1d5db',
  },
  senderText: {
    fontWeight: '500',
  },
  userSender: {
    color: 'white',
  },
  assistantSender: {
    color: '#374151',
  },
  userText: {
    color: 'white',
  },
  assistantText: {
    color: '#374151',
  },
  timeText: {
    fontSize: 12,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  userTime: {
    color: '#bfdbfe',
  },
  assistantTime: {
    color: '#6b7280',
  },
});
