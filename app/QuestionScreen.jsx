import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Animated,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Emotion icons mapping for visual feedback
const EMOTIONS = {
  Very: '😁',
  Somewhat: '🙂',
  Neutral: '😐',
  'Not much': '😕',
  'Not at all': '😞',
  'Very well': '💪',
  Well: '👍',
  Poorly: '👎',
  'Very poorly': '😫',
  Refreshed: '🌞',
  Okay: '👌',
  Tired: '😴',
  Exhausted: '💤',
  Never: '❌',
  Rarely: '🕒',
  Sometimes: '🔄',
  Often: '⏱️',
  Always: '🔁',
  'Very interested': '🤩',
  'Somewhat interested': '🙂',
  'Less interested': '🥱',
  'Not interested at all': '😑',
  Sunny: '☀️',
  'Partly cloudy': '⛅',
  Overcast: '☁️',
  Rainy: '🌧️',
  Stormy: '⛈️',
  'Very connected': '🤝',
  Connected: '👥',
  Distant: '↔️',
  Isolated: '🏝️',
  Accomplished: '🏆',
  Indifferent: '🤷',
  Drained: '🔋',
  Defeated: '😩',
  Constantly: '⏰',
  Hopeful: '🌈',
  'Cautiously optimistic': '🤞',
  Uncertain: '❓',
  Worried: '😟',
  Hopeless: '💔',
};

export const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (token !== null) {
      console.log('Token:', token);
      return token;
    } else {
      console.log('No token found');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};

const QUESTIONS = [
  {
    id: 'q1',
    text: 'How optimistic are you about your future?',
    options: ['Very', 'Somewhat', 'Neutral', 'Not much', 'Not at all'],
    color: ['#8360c3', '#2ebf91'],
    icon: '🔮',
  },
  {
    id: 'q2',
    text: 'How do you handle stress?',
    options: ['Very well', 'Well', 'Neutral', 'Poorly', 'Very poorly'],
    color: ['#ff9966', '#ff5e62'],
    icon: '🧘',
  },
  {
    id: 'q3',
    text: 'When you wake up in the morning, how do you usually feel?',
    options: ['Refreshed', 'Okay', 'Neutral', 'Tired', 'Exhausted'],
    color: ['#56CCF2', '#2F80ED'],
    icon: '🌅',
  },
  {
    id: 'q4',
    text: 'How often do you feel lonely, even in a crowd?',
    options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
    color: ['#4776E6', '#8E54E9'],
    icon: '👥',
  },
  {
    id: 'q5',
    text: 'How interested are you in things you used to enjoy?',
    options: [
      'Very interested',
      'Somewhat interested',
      'Neutral',
      'Less interested',
      'Not interested at all',
    ],
    color: ['#00b09b', '#96c93d'],
    icon: '🎭',
  },
  {
    id: 'q6',
    text: 'If your emotions were a weather forecast, what would they be?',
    options: ['Sunny', 'Partly cloudy', 'Overcast', 'Rainy', 'Stormy'],
    color: ['#2193b0', '#6dd5ed'],
    icon: '☁️',
  },
  {
    id: 'q7',
    text: 'How do you feel about your social connections?',
    options: ['Very connected', 'Connected', 'Neutral', 'Distant', 'Isolated'],
    color: ['#834d9b', '#d04ed6'],
    icon: '🔄',
  },
  {
    id: 'q8',
    text: 'How do you usually feel at the end of the day?',
    options: ['Accomplished', 'Okay', 'Indifferent', 'Drained', 'Defeated'],
    color: ['#5614B0', '#DBD65C'],
    icon: '🌆',
  },
  {
    id: 'q9',
    text: 'How often do negative thoughts take over your mind?',
    options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Constantly'],
    color: ['#2c3e50', '#4ca1af'],
    icon: '💭',
  },
  {
    id: 'q10',
    text: 'How do you feel about the future?',
    options: ['Hopeful', 'Cautiously optimistic', 'Uncertain', 'Worried', 'Hopeless'],
    color: ['#3494E6', '#EC6EAD'],
    icon: '🚀',
  },
];

export default function QuestionScreen() {
  const navigation = useNavigation();
  const screenAnimation = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const loadingOpacity = useRef(new Animated.Value(0)).current;
  const loadingScale = useRef(new Animated.Value(0.8)).current;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [displayFeedback, setDisplayFeedback] = useState(false);

  // Animation when component mounts and when currentIndex changes
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: currentIndex / (QUESTIONS.length - 1),
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [currentIndex]);

  // Animation for loading state
  useEffect(() => {
    if (loading) {
      Animated.parallel([
        Animated.timing(loadingOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(loadingScale, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        // Pulse animation for loading indicator
        Animated.loop(
          Animated.sequence([
            Animated.timing(screenAnimation, {
              toValue: 1,
              duration: 800,
              useNativeDriver: true,
            }),
            Animated.timing(screenAnimation, {
              toValue: 0.8,
              duration: 800,
              useNativeDriver: true,
            }),
          ])
        ),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(loadingOpacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(loadingScale, {
          toValue: 0.8,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [loading]);

  const handleAnswer = (answer) => {
    // Set the selected option for visual feedback
    setSelectedOption(answer);
    setDisplayFeedback(true);

    // Animate the selection
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.05,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Save answer
    const questionId = QUESTIONS[currentIndex].id;
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);

    // Delay before proceeding to the next question for animation
    setTimeout(() => {
      // Transition to next question with animation
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        if (currentIndex < QUESTIONS.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setSelectedOption(null);
          setDisplayFeedback(false);

          // Fade in new question
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }).start();
        } else {
          submitToAI(newAnswers);
        }
      });
    }, 800);
  };

  const submitToAI = async (allAnswers) => {
    setLoading(true);
    try {
      const token = await getAuthToken();
      const response = await axios.post(
        'https://m40cw5th-5000.inc1.devtunnels.ms/api/v1/save_user_preference',
        {
          userId: '9101c4af-97b2-4dae-9820-3ae31685403d',
          questions: QUESTIONS,
          answers: allAnswers,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Navigate with animation
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        navigation.navigate('Results', {
          rating: response.data.analysis?.rating || 5,
          traits: response.data.analysis?.traits || [],
          suggestions: response.data.analysis?.suggestions || [],
          answers: allAnswers, // Pass answers for potential later reference
        });
      });
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      alert('Analysis failed. Please try again.');

      // Reset animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } finally {
      setLoading(false);
    }
  };

  // Calculate progress
  const currentQuestion = QUESTIONS[currentIndex];
  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const pulseScale = screenAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.1, 1],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={currentQuestion.color}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        {/* Progress bar */}
        <View style={styles.progressContainer}>
          <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
          <Text style={styles.progressText}>
            {currentIndex + 1} / {QUESTIONS.length}
          </Text>
        </View>

        <Animated.View
          style={[
            styles.card,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}>
          {/* Question icon */}
          <Text style={styles.questionIcon}>{currentQuestion.icon}</Text>

          <Text style={styles.question}>{currentQuestion.text}</Text>

          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option) => (
              <TouchableOpacity
                key={option}
                style={[styles.optionButton, selectedOption === option && styles.selectedOption]}
                onPress={() => handleAnswer(option)}
                disabled={loading || displayFeedback}>
                <Text style={styles.optionText}>{option}</Text>
                {selectedOption === option && displayFeedback && (
                  <Text style={styles.emotionIcon}>{EMOTIONS[option] || '👍'}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Custom animated loading overlay without Lottie */}
        <Animated.View
          style={[
            styles.loadingOverlay,
            {
              opacity: loadingOpacity,
              transform: [{ scale: loadingScale }],
            },
          ]}
          pointerEvents={loading ? 'auto' : 'none'}>
          <Animated.View style={[styles.loadingCircle, { transform: [{ scale: pulseScale }] }]}>
            <ActivityIndicator size="large" color="#ffffff" />
          </Animated.View>
          <Text style={styles.loadingText}>Analyzing your responses...</Text>

          {/* Animated dots for loading indicator */}
          <View style={styles.dotsContainer}>
            {[0, 1, 2].map((i) => (
              <Animated.View
                key={i}
                style={[
                  styles.dot,
                  {
                    opacity: screenAnimation.interpolate({
                      inputRange: [0, 0.3, 0.6, 1],
                      outputRange: [
                        i === 0 ? 1 : 0.3,
                        i === 1 ? 1 : 0.3,
                        i === 2 ? 1 : 0.3,
                        i === 0 ? 1 : 0.3,
                      ],
                    }),
                  },
                ]}
              />
            ))}
          </View>
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  progressContainer: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 4,
    marginBottom: 20,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  progressText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    position: 'absolute',
    right: 10,
    top: 16,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 16,
    padding: 24,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  questionIcon: {
    fontSize: 48,
    marginBottom: 20,
    textAlign: 'center',
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
    textAlign: 'center',
    lineHeight: 32,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  selectedOption: {
    backgroundColor: 'rgba(74, 144, 226, 0.15)',
    borderColor: '#4A90E2',
    borderWidth: 1,
  },
  optionText: {
    color: '#444',
    fontSize: 16,
    fontWeight: '500',
  },
  emotionIcon: {
    fontSize: 24,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  loadingCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    textAlign: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginHorizontal: 4,
  },
});
