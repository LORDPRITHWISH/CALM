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
} from 'react-native';

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    {
      id: '1',
      content: 'Hello! How can I help you today?',
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef(null);
  const inputRef = useRef(null);

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

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(input),
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const getAIResponse = (userInput) => {
    const responses = [
      "I understand you're asking about: " + userInput,
      "That's an interesting point about " + userInput,
      'Let me think about ' + userInput,
      'I can help with ' + userInput,
      'Thanks for sharing that. What else would you like to know?',
    ];
    return responses[Math.floor(Math.random() * responses.length)];
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
            {isUser ? 'You' : 'AI Assistant'}
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
          <Text style={styles.headerText}>AI Chat</Text>
        </View>

        <View style={styles.messagesContainer}>
          {messages.length === 0 ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <Bot size={32} color="#3b82f6" />
              </View>
              <Text style={styles.emptyTitle}>Welcome to AI Chat</Text>
              <Text style={styles.emptySubtitle}>Start a conversation with the AI assistant.</Text>
            </View>
          ) : (
            <FlatList
              ref={flatListRef}
              data={messages}
              renderItem={renderMessage}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.messagesList}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Type a message..."
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
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIcon: {
    marginBottom: 16,
    height: 64,
    width: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
    backgroundColor: '#dbeafe',
  },
  emptyTitle: {
    marginBottom: 8,
    textAlign: 'center',
    color: '#6b7280',
  },
  emptySubtitle: {
    maxWidth: 320,
    textAlign: 'center',
    color: '#9ca3af',
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
