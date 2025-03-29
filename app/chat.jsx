import { Send, User, Bot, ChevronDown, MoreVertical } from 'lucide-react-native';
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
  Animated,
  Easing,
  Dimensions,
  Pressable,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    {
      id: '1',
      content: "Hello! I'm your AI assistant. How can I help you today?",
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingIndicator] = useState(new Animated.Value(0));
  const flatListRef = useRef(null);
  const inputRef = useRef(null);

  // Typing animation
  useEffect(() => {
    if (isTyping) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(typingIndicator, {
            toValue: 1,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(typingIndicator, {
            toValue: 0,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      typingIndicator.setValue(0);
    }
  }, [isTyping]);

  // Keyboard handling
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
    setIsTyping(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000));

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(input),
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const getAIResponse = (userInput) => {
    const responses = [
      `I understand you're asking about "${userInput}". Can you tell me more?`,
      `Interesting question about ${userInput}. Here's what I know...`,
      `Regarding ${userInput}, the information I have suggests...`,
      `Let me analyze your query about ${userInput}...`,
      `Thanks for asking about ${userInput}. Here's my response:`,
      `I've processed your request regarding ${userInput}. Here are the details:`,
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const renderMessage = ({ item, index }) => {
    const isUser = item.role === 'user';
    const showHeader = index === 0 || messages[index - 1].role !== item.role;

    return (
      <View
        style={[
          styles.messageContainer,
          isUser ? styles.userMessage : styles.assistantMessage,
          { marginTop: showHeader ? 12 : 4 },
        ]}>
        {showHeader && (
          <View style={styles.messageHeader}>
            <View style={[styles.avatar, isUser ? styles.userAvatar : styles.assistantAvatar]}>
              {isUser ? <User size={14} color="white" /> : <Bot size={14} color="#374151" />}
            </View>
            <Text style={[styles.senderText, isUser ? styles.userSender : styles.assistantSender]}>
              {isUser ? 'You' : 'AI Assistant'}
            </Text>
          </View>
        )}
        <Text style={isUser ? styles.userText : styles.assistantText}>{item.content}</Text>
        <View style={styles.messageFooter}>
          <Text style={[styles.timeText, isUser ? styles.userTime : styles.assistantTime]}>
            {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
          {isUser && (
            <TouchableOpacity style={styles.messageAction}>
              <MoreVertical size={14} color={isUser ? '#bfdbfe' : '#6b7280'} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const renderTypingIndicator = () => {
    if (!isTyping) return null;

    return (
      <View style={[styles.messageContainer, styles.assistantMessage, { marginTop: 4 }]}>
        <View style={styles.messageHeader}>
          <View style={[styles.avatar, styles.assistantAvatar]}>
            <Bot size={14} color="#374151" />
          </View>
          <Text style={[styles.senderText, styles.assistantSender]}>AI Assistant</Text>
        </View>
        <View style={styles.typingContainer}>
          <Animated.View
            style={[styles.typingDot, { transform: [{ translateY: typingIndicator }] }]}
          />
          <Animated.View
            style={[
              styles.typingDot,
              { transform: [{ translateY: typingIndicator }] },
              { animationDelay: '100ms' },
            ]}
          />
          <Animated.View
            style={[
              styles.typingDot,
              { transform: [{ translateY: typingIndicator }] },
              { animationDelay: '200ms' },
            ]}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
        {/* Header with dropdown */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerDropdown}>
            <Text style={styles.headerText}>AI Assistant</Text>
            <ChevronDown size={18} color="#374151" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <MoreVertical size={20} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Chat messages */}
        <View style={styles.messagesContainer}>
          {messages.length === 0 ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <Bot size={32} color="#3b82f6" />
              </View>
              <Text style={styles.emptyTitle}>Welcome to AI Chat</Text>
              <Text style={styles.emptySubtitle}>Start a conversation with your AI assistant</Text>
            </View>
          ) : (
            <FlatList
              ref={flatListRef}
              data={messages}
              renderItem={renderMessage}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.messagesList}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={renderTypingIndicator}
              onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
            />
          )}
        </View>

        {/* Input area */}
        <View style={styles.inputWrapper}>
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
          <Text style={styles.inputHint}>
            {input.length > 0 ? `${input.length}/1000` : 'Press enter to send'}
          </Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e7eb',
  },
  headerDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginRight: 4,
  },
  headerButton: {
    padding: 4,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesList: {
    paddingVertical: 12,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
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
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#374151',
  },
  emptySubtitle: {
    fontSize: 14,
    maxWidth: 320,
    textAlign: 'center',
    color: '#6b7280',
  },
  inputWrapper: {
    marginBottom: Platform.OS === 'ios' ? 16 : 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
    color: '#374151',
    maxHeight: 120,
  },
  inputHint: {
    marginTop: 4,
    marginLeft: 16,
    fontSize: 12,
    color: '#9ca3af',
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
    padding: 16,
    marginVertical: 4,
    maxWidth: '80%',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  userMessage: {
    alignSelf: 'flex-end',
    borderTopRightRadius: 0,
    backgroundColor: '#3b82f6',
  },
  assistantMessage: {
    alignSelf: 'flex-start',
    borderTopLeftRadius: 0,
    backgroundColor: '#f3f4f6',
  },
  messageHeader: {
    marginBottom: 8,
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
    fontSize: 13,
    fontWeight: '600',
  },
  userSender: {
    color: '#bfdbfe',
  },
  assistantSender: {
    color: '#4b5563',
  },
  userText: {
    color: 'white',
    fontSize: 15,
    lineHeight: 20,
  },
  assistantText: {
    color: '#374151',
    fontSize: 15,
    lineHeight: 20,
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 8,
  },
  timeText: {
    fontSize: 11,
    marginRight: 4,
  },
  userTime: {
    color: '#bfdbfe',
  },
  assistantTime: {
    color: '#9ca3af',
  },
  messageAction: {
    padding: 4,
  },
  typingContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#9ca3af',
    marginHorizontal: 2,
  },
});
