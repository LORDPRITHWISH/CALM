import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share } from 'react-native';

export default function ResultsScreen() {
  const route = useRoute();
  const [expandedSuggestions, setExpandedSuggestions] = useState({});

  // Destructure with default values
  const { rating = 0, traits = [], suggestions = [] } = route.params || {};

  // Calculate percentages
  const ratingPercentage = Math.min(100, rating * 10);

  // Get color based on score
  const getScoreColor = (score) => {
    if (score >= 8) return '#4CAF50'; // Green
    if (score >= 6) return '#FFC107'; // Amber
    return '#F44336'; // Red
  };

  // Toggle suggestion expansion
  const toggleSuggestion = (index) => {
    setExpandedSuggestions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Share results
  const shareResults = async () => {
    try {
      await Share.share({
        title: 'My Personality Assessment',
        message: `My personality assessment results:\n\nRating: ${rating}/10\n\nTraits:\n${traits.map((t) => `${t.trait}: ${t.score}/10`).join('\n')}\n\nSuggestions:\n${suggestions.join('\n')}`,
      });
    } catch (error) {
      console.error('Sharing failed', error);
    }
  };

  // Get rating description
  const getRatingDescription = () => {
    if (rating >= 8) return 'Excellent! Keep up the great work!';
    if (rating >= 6) return 'Good job! There are some opportunities for growth.';
    return "Let's work on improving these areas together.";
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Personality Insights</Text>
      </View>

      {/* Overall Rating Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Overall Well-being Score</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>
            {rating}
            <Text style={styles.ratingTotal}>/10</Text>
          </Text>
          <View style={styles.ratingBar}>
            <View
              style={[
                styles.ratingFill,
                {
                  width: `${ratingPercentage}%`,
                  backgroundColor: getScoreColor(rating),
                },
              ]}
            />
          </View>
          <Text style={styles.ratingDescription}>{getRatingDescription()}</Text>
        </View>
      </View>

      {/* Personality Traits Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Personality Traits</Text>
        {traits.map((trait, index) => (
          <View key={index} style={styles.traitContainer}>
            <View style={styles.traitHeader}>
              <Text style={styles.traitName}>{trait.trait}</Text>
              <Text style={styles.traitScore}>{trait.score}/10</Text>
            </View>
            <View style={styles.traitScoreContainer}>
              <View
                style={[
                  styles.traitScoreBar,
                  {
                    width: `${trait.score * 10}%`,
                    backgroundColor: getScoreColor(trait.score),
                  },
                ]}
              />
            </View>
          </View>
        ))}
      </View>

      {/* Suggestions Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Personalized Suggestions</Text>
          <TouchableOpacity onPress={shareResults} style={styles.shareButton}>
            <Text style={styles.shareButtonText}>Share</Text>
          </TouchableOpacity>
        </View>

        {suggestions.map((suggestion, index) => (
          <TouchableOpacity key={index} onPress={() => toggleSuggestion(index)} activeOpacity={0.7}>
            <View style={styles.suggestionContainer}>
              <Text style={styles.bullet}>•</Text>
              <Text
                style={styles.suggestionText}
                numberOfLines={expandedSuggestions[index] ? undefined : 2}>
                {suggestion}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    paddingBottom: 40,
  },
  header: {
    marginBottom: 25,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    marginBottom: 30,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
  },
  ratingContainer: {
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 5,
  },
  ratingTotal: {
    fontSize: 24,
    color: '#777',
  },
  ratingBar: {
    height: 12,
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  ratingFill: {
    height: '100%',
  },
  ratingDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  traitContainer: {
    marginBottom: 15,
  },
  traitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  traitName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#444',
  },
  traitScore: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  traitScoreContainer: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  traitScoreBar: {
    height: '100%',
  },
  suggestionContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  bullet: {
    marginRight: 10,
    fontSize: 20,
    color: '#4A90E2',
    marginTop: 2,
  },
  suggestionText: {
    flex: 1,
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
  shareButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  shareButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});
