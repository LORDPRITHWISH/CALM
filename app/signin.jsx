import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, Lock, User } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginPage() {
  const navigation = useNavigation();
  const [loginData, setLoginData] = useState({
    usernameOrEmail: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (!loginData.usernameOrEmail || !loginData.password) {
      Alert.alert('Error', 'Please enter both username/email and password');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch('https://m40cw5th-5000.inc1.devtunnels.ms/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Check if input is email or username
          [loginData.usernameOrEmail.includes('@') ? 'email' : 'username']:
            loginData.usernameOrEmail,
          password: loginData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful login
        Alert.alert('Success', 'Login successful!', [
          { text: 'OK', onPress: () => navigation.navigate('Home') },
        ]);
        // You might want to store the authentication token here
        // AsyncStorage.setItem('authToken', data.token);
      } else {
        Alert.alert('Error', data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please check your connection and try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View className="flex-1 justify-center px-6 py-8">
            {/* Header */}
            <View className="mb-10 items-center">
              <Text className="text-3xl font-bold text-blue-600">Welcome Back</Text>
              <Text className="mt-2 text-gray-500">Sign in to continue</Text>
            </View>
            {/* Login Form */}
            <View className="mb-6">
              {/* Username/Email Input */}
              <View className="mb-4">
                <Text className="mb-2 text-gray-700">Username or Email</Text>
                <View className="flex-row items-center rounded-lg border border-gray-300 px-4 py-3">
                  {loginData.usernameOrEmail.includes('@') ? (
                    <Mail size={20} color="#64748b" />
                  ) : (
                    <User size={20} color="#64748b" />
                  )}
                  <TextInput
                    className="ml-3 flex-1 text-gray-700"
                    placeholder="Enter username or email"
                    placeholderTextColor="#94a3b8"
                    autoCapitalize="none"
                    value={loginData.usernameOrEmail}
                    onChangeText={(text) => handleChange('usernameOrEmail', text)}
                  />
                </View>
              </View>

              {/* Password Input */}
              <View className="mb-6">
                <Text className="mb-2 text-gray-700">Password</Text>
                <View className="flex-row items-center rounded-lg border border-gray-300 px-4 py-3">
                  <Lock size={20} color="#64748b" />
                  <TextInput
                    className="ml-3 flex-1 text-gray-700"
                    placeholder="Enter your password"
                    placeholderTextColor="#94a3b8"
                    secureTextEntry
                    value={loginData.password}
                    onChangeText={(text) => handleChange('password', text)}
                  />
                </View>
                {/* <TouchableOpacity
                  className="mt-2 self-end"
                  onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text className="text-sm text-blue-500">Forgot password?</Text>
                </TouchableOpacity> */}
              </View>

              {/* Login Button */}
              <TouchableOpacity
                className="items-center rounded-lg bg-blue-600 py-4 shadow-md shadow-blue-200"
                activeOpacity={0.8}
                onPress={handleLogin}
                disabled={loading}>
                <Text className="text-lg font-semibold text-white">
                  {loading ? 'Logging in...' : 'Sign In'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View className="my-6 flex-row items-center">
              <View className="h-px flex-1 bg-gray-300" />
              <Text className="mx-4 text-gray-400">OR</Text>
              <View className="h-px flex-1 bg-gray-300" />
            </View>

            {/* Sign Up Link */}
            <View className="flex-row justify-center">
              <Text className="text-gray-500">Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text className="font-semibold text-blue-600">Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
