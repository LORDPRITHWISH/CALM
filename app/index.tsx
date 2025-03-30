import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const WelcomePage = () => {
  
  const navigation = useNavigation();

  // Animation values

  const fadeIn = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(50)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const titleFloat = useRef(new Animated.Value(0)).current;
  const messageFloat = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in and slide up animations
    Animated.parallel([
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(slideUp, {
        toValue: 0,
        duration: 1200,
        easing: Easing.cubic,
        useNativeDriver: true,
      }),
    ]).start();

    // Floating animation for title
    Animated.loop(
      Animated.sequence([
        Animated.timing(titleFloat, {
          toValue: 1,
          duration: 2500,
          easing: Easing.sin,
          useNativeDriver: true,
        }),
        Animated.timing(titleFloat, {
          toValue: 0,
          duration: 2500,
          easing: Easing.sin,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Floating animation for message - slightly out of phase with title
    Animated.loop(
      Animated.sequence([
        Animated.timing(messageFloat, {
          toValue: 1,
          duration: 3000,
          easing: Easing.sin,
          useNativeDriver: true,
        }),
        Animated.timing(messageFloat, {
          toValue: 0,
          duration: 3000,
          easing: Easing.sin,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleButtonPress = () => {
    // Button press animation
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 1.2,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Navigate to login after animation
      navigation.navigate('signin');
    });
  };

  // Animation interpolations
  const titleTranslateY = titleFloat.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -15],
  });

  const messageTranslateY = messageFloat.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#e6f2ff', '#c9e3ff', '#a8d1ff']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        {/* Background bubbles or shapes */}
        <Animated.View
          style={[
            styles.bubble,
            styles.bubble1,
            { opacity: fadeIn.interpolate({ inputRange: [0, 1], outputRange: [0, 0.7] }) },
          ]}
        />
        <Animated.View
          style={[
            styles.bubble,
            styles.bubble2,
            { opacity: fadeIn.interpolate({ inputRange: [0, 1], outputRange: [0, 0.5] }) },
          ]}
        />
        <Animated.View
          style={[
            styles.bubble,
            styles.bubble3,
            { opacity: fadeIn.interpolate({ inputRange: [0, 1], outputRange: [0, 0.6] }) },
          ]}
        />

        <SafeAreaView style={styles.contentWrapper}>
          <Animated.View
            style={[
              styles.contentContainer,
              {
                opacity: fadeIn,
                transform: [{ translateY: slideUp }],
              },
            ]}>
            {/* Floating title */}
            <Animated.Text style={[styles.title, { transform: [{ translateY: titleTranslateY }] }]}>
              A Journey Through Your Inner World
            </Animated.Text>

            {/* Floating message container */}
            <Animated.View
              style={[
                styles.messageContainer,
                {
                  opacity: fadeIn,
                  transform: [{ translateY: messageTranslateY }],
                },
              ]}>
              <Text style={styles.message}>
                Welcome! This is a simple exploration of your thoughts and feelings—like a quiet
                conversation with yourself. There are no right or wrong answers, just gentle
                reflections on where you are right now.
              </Text>
            </Animated.View>

            <Animated.View
              style={{
                transform: [{ scale: buttonScale }],
              }}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleButtonPress}
                activeOpacity={0.8}>
                <Text style={styles.buttonText}>Welcome</Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
  },
  gradient: {
    flex: 1,
    width: width,
    height: height,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    width: width,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#0055bb',
    textAlign: 'center',
    marginBottom: 40,
    textShadowColor: 'rgba(255, 255, 255, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  messageContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 25,
    padding: 30,
    marginBottom: 60,
    width: '100%',
    maxWidth: 600,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  message: {
    fontSize: 22,
    lineHeight: 34,
    color: '#2c3e50',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0066cc',
    paddingVertical: 18,
    paddingHorizontal: 70,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
  },
  bubble: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: 'white',
  },
  bubble1: {
    width: 200,
    height: 200,
    top: height * 0.1,
    left: width * 0.1,
    backgroundColor: 'rgba(173, 216, 230, 0.4)',
  },
  bubble2: {
    width: 150,
    height: 150,
    bottom: height * 0.15,
    right: width * 0.1,
    backgroundColor: 'rgba(135, 206, 250, 0.4)',
  },
  bubble3: {
    width: 100,
    height: 100,
    top: height * 0.6,
    left: width * 0.2,
    backgroundColor: 'rgba(176, 224, 230, 0.4)',
  },
});

export default WelcomePage;
