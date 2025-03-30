import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

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
  },
  {
    id: 'q2',
    text: 'How do you handle stress?',
    options: ['Very well', 'Well', 'Neutral', 'Poorly', 'Very poorly'],
  },
  {
    id: 'q3',
    text: 'When you wake up in the morning, how do you usually feel?',
    options: ['Refreshed', 'Okay', 'Neutral', 'Tired', 'Exhausted'],
  },
  {
    id: 'q4',
    text: 'How often do you feel lonely, even in a crowd?',
    options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
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
  },
  {
    id: 'q6',
    text: 'If your emotions were a weather forecast, what would they be?',
    options: ['Sunny', 'Partly cloudy', 'Overcast', 'Rainy', 'Stormy'],
  },
  {
    id: 'q7',
    text: 'How do you feel about your social connections?',
    options: ['Very connected', 'Connected', 'Neutral', 'Distant', 'Isolated'],
  },
  {
    id: 'q8',
    text: 'How do you usually feel at the end of the day?',
    options: ['Accomplished', 'Okay', 'Indifferent', 'Drained', 'Defeated'],
  },
  {
    id: 'q9',
    text: 'How often do negative thoughts take over your mind?',
    options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Constantly'],
  },
  {
    id: 'q10',
    text: 'How do you feel about the future?',
    options: ['Hopeful', 'Cautiously optimistic', 'Uncertain', 'Worried', 'Hopeless'],
  },
];

export default function QuestionScreen() {
  const navigation = useNavigation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);

  const handleAnswer = (answer) => {
    const questionId = QUESTIONS[currentIndex].id;
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);

    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      submitToAI(newAnswers);
    }
  };

  const submitToAI = async (allAnswers) => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://m40cw5th-5000.inc1.devtunnels.ms/api/v1/save_user_preference',
        {
          userId: '64db9078-6437-4840-81a1-657194c253f7',
          questions: QUESTIONS,
          answers: allAnswers,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${await getAuthToken()}`,
          },
        }
      );
      console.log('Navigation params:', {
        rating: response.data.analysis?.rating,
        traits: response.data.analysis?.traits,
        suggestions: response.data.analysis?.suggestions,
      });

      navigation.navigate('Results', {
        rating: response.data.analysis?.rating || 5,
        traits: response.data.analysis?.traits || [],
        suggestions: response.data.analysis?.suggestions || [],
      });
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      alert('Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.progress}>
        Question {currentIndex + 1} of {QUESTIONS.length}
      </Text>
      <Text style={styles.question}>{QUESTIONS[currentIndex].text}</Text>

      <View style={styles.optionsContainer}>
        {QUESTIONS[currentIndex].options.map((option) => (
          <TouchableOpacity
            key={option}
            style={styles.optionButton}
            onPress={() => handleAnswer(option)}
            disabled={loading}>
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading && <ActivityIndicator size="large" color="#4A90E2" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  progress: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  question: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 15,
  },
  optionButton: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  optionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});
