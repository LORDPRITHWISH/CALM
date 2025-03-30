import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Companion</Text>
        <TouchableOpacity style={styles.profileButton}>
          <View style={styles.profileIconContainer}>
            <Text style={styles.profileInitial}>J</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.scrollView}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Hello there,</Text>
          <Text style={styles.nameText}>James</Text>
          <Text style={styles.subText}>You're not alone. We're here for you.</Text>
        </View>

        {/* Featured Card */}
        <LinearGradient colors={['#E6F2FF', '#FFFFFF']} style={styles.featuredCard}>
          <View style={styles.cardContent}>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Need someone to talk to?</Text>
              <Text style={styles.cardDescription}>
                Connect with a supportive listener now, or schedule a call for later
              </Text>
              <TouchableOpacity style={styles.cardButton}>
                <Text style={styles.cardButtonText}>Connect Now</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.cardImageContainer}>
              <View style={styles.imageCircle} />
            </View>
          </View>
        </LinearGradient>

        {/* Quick Action Buttons */}
        <Text style={styles.sectionTitle}>How are you feeling today?</Text>
        <View style={styles.moodContainer}>
          <TouchableOpacity style={styles.moodOption}>
            <View style={[styles.moodCircle, { backgroundColor: '#E6F2FF' }]}>
              <Text style={{ fontSize: 20 }}>😊</Text>
            </View>
            <Text style={styles.moodText}>Good</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.moodOption}>
            <View style={[styles.moodCircle, { backgroundColor: '#F0F0F0' }]}>
              <Text style={{ fontSize: 20 }}>😐</Text>
            </View>
            <Text style={styles.moodText}>Okay</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.moodOption}>
            <View style={[styles.moodCircle, { backgroundColor: '#FFE6E6' }]}>
              <Text style={{ fontSize: 20 }}>😔</Text>
            </View>
            <Text style={styles.moodText}>Low</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.moodOption}>
            <View style={[styles.moodCircle, { backgroundColor: '#FFD9D9' }]}>
              <Text style={{ fontSize: 20 }}>😣</Text>
            </View>
            <Text style={styles.moodText}>Distressed</Text>
          </TouchableOpacity>
        </View>

        {/* Support Options */}
        <Text style={styles.sectionTitle}>Support Options</Text>
        <View style={styles.supportOptionsContainer}>
          <TouchableOpacity style={styles.supportCard}>
            <View style={[styles.supportIconCircle, { backgroundColor: '#E6F2FF' }]} />
            <Text style={styles.supportTitle}>Talk to Someone</Text>
            <Text style={styles.supportDescription}>Connect with a trained listener</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.supportCard}>
            <View style={[styles.supportIconCircle, { backgroundColor: '#E6F2FF' }]} />
            <Text style={styles.supportTitle}>Guided Activities</Text>
            <Text style={styles.supportDescription}>Calming exercises & meditations</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.supportCard}>
            <View style={[styles.supportIconCircle, { backgroundColor: '#FFE6E6' }]} />
            <Text style={styles.supportTitle}>Emergency Help</Text>
            <Text style={styles.supportDescription}>Crisis resources & contacts</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.supportCard}>
            <View style={[styles.supportIconCircle, { backgroundColor: '#E6F2FF' }]} />
            <Text style={styles.supportTitle}>Support Groups</Text>
            <Text style={styles.supportDescription}>Connect with peers</Text>
          </TouchableOpacity>
        </View>

        {/* Daily Inspiration */}
        <View style={styles.inspirationContainer}>
          <Text style={styles.inspirationTitle}>Today's Thought</Text>
          <Text style={styles.inspirationQuote}>
            "You are not alone in your journey. Each step forward, no matter how small, is progress
            worth celebrating."
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('home')}>
          <View style={[styles.navIcon, activeTab === 'home' ? styles.activeNavIcon : null]} />
          <Text style={[styles.navText, activeTab === 'home' ? styles.activeNavText : null]}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('journal')}>
          <View style={[styles.navIcon, activeTab === 'journal' ? styles.activeNavIcon : null]} />
          <Text style={[styles.navText, activeTab === 'journal' ? styles.activeNavText : null]}>
            Journal
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('resources')}>
          <View style={[styles.navIcon, activeTab === 'resources' ? styles.activeNavIcon : null]} />
          <Text style={[styles.navText, activeTab === 'resources' ? styles.activeNavText : null]}>
            Resources
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('profile')}>
          <View style={[styles.navIcon, activeTab === 'profile' ? styles.activeNavIcon : null]} />
          <Text style={[styles.navText, activeTab === 'profile' ? styles.activeNavText : null]}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  logo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E88E5',
  },
  profileButton: {
    padding: 5,
  },
  profileIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E6F2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E88E5',
  },
  scrollView: {
    flex: 1,
  },
  welcomeSection: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 15,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666666',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E88E5',
    marginBottom: 5,
  },
  subText: {
    fontSize: 16,
    color: '#666666',
  },
  featuredCard: {
    marginHorizontal: 20,
    marginVertical: 15,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    padding: 20,
    flexDirection: 'row',
  },
  cardTextContainer: {
    flex: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E88E5',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 15,
    lineHeight: 20,
  },
  cardButton: {
    backgroundColor: '#E53935', // Red accent
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  cardButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cardImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#BBDEFB',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  moodOption: {
    alignItems: 'center',
  },
  moodCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  moodText: {
    fontSize: 14,
    color: '#666666',
  },
  supportOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  supportCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  supportIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 10,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  supportDescription: {
    fontSize: 12,
    color: '#666666',
  },
  inspirationContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: '#E6F2FF',
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#1E88E5',
  },
  inspirationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E88E5',
    marginBottom: 10,
  },
  inspirationQuote: {
    fontSize: 15,
    fontStyle: 'italic',
    color: '#333333',
    lineHeight: 22,
  },
  bottomNav: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E0E0E0',
    marginBottom: 4,
  },
  activeNavIcon: {
    backgroundColor: '#1E88E5',
  },
  navText: {
    fontSize: 12,
    color: '#999999',
  },
  activeNavText: {
    color: '#1E88E5',
    fontWeight: 'bold',
  },
});

export default LandingPage;
