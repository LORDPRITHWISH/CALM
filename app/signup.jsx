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
import { User, Mail, Lock, Phone } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export default function SignUpPage() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'PATIENT', // default role
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      Alert.alert('Error', 'Please fill all fields');
      return false;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      Alert.alert('Error', 'Please enter a valid email');
      return false;
    }

    if (formData.password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: formData.role,
      };

      const response = await fetch('https://m40cw5th-5000.inc1.devtunnels.ms/api/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        Alert.alert('Success', 'Account created successfully!', [
          { text: 'OK', onPress: () => navigation.navigate('Home') },
        ]);
      } else {
        Alert.alert('Error', data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please check your connection and try again.');
      console.error('Registration error:', error);
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
          <View className="flex-1 px-6 py-8">
            {/* Logo Header */}
            <View className="mb-8 items-center">
              <Text className="text-3xl font-bold text-blue-600">Create Account</Text>
              <Text className="mt-2 text-gray-500">Join us today!</Text>
            </View>

            {/* Form */}
            <View className="mb-6">
              {/* Full Name Input */}
              <View className="mb-4">
                <Text className="mb-2 text-gray-700">Full Name</Text>
                <View className="flex-row items-center rounded-lg border border-gray-300 px-4 py-3">
                  <User size={20} color="#64748b" />
                  <TextInput
                    className="ml-3 flex-1 text-gray-700"
                    placeholder="Enter your full name"
                    placeholderTextColor="#94a3b8"
                    autoCapitalize="words"
                    value={formData.name}
                    onChangeText={(text) => handleChange('name', text)}
                  />
                </View>
              </View>

              {/* Email Input */}
              <View className="mb-4">
                <Text className="mb-2 text-gray-700">Email</Text>
                <View className="flex-row items-center rounded-lg border border-gray-300 px-4 py-3">
                  <Mail size={20} color="#64748b" />
                  <TextInput
                    className="ml-3 flex-1 text-gray-700"
                    placeholder="Enter your email"
                    placeholderTextColor="#94a3b8"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={formData.email}
                    onChangeText={(text) => handleChange('email', text)}
                  />
                </View>
              </View>

              {/* Phone Input */}
              <View className="mb-4">
                <Text className="mb-2 text-gray-700">Phone Number</Text>
                <View className="flex-row items-center rounded-lg border border-gray-300 px-4 py-3">
                  <Phone size={20} color="#64748b" />
                  <TextInput
                    className="ml-3 flex-1 text-gray-700"
                    placeholder="Enter your phone number"
                    placeholderTextColor="#94a3b8"
                    keyboardType="phone-pad"
                    value={formData.phone}
                    onChangeText={(text) => handleChange('phone', text)}
                  />
                </View>
              </View>

              {/* Password Input */}
              <View className="mb-4">
                <Text className="mb-2 text-gray-700">Password</Text>
                <View className="flex-row items-center rounded-lg border border-gray-300 px-4 py-3">
                  <Lock size={20} color="#64748b" />
                  <TextInput
                    className="ml-3 flex-1 text-gray-700"
                    placeholder="Create a password"
                    placeholderTextColor="#94a3b8"
                    secureTextEntry
                    value={formData.password}
                    onChangeText={(text) => handleChange('password', text)}
                  />
                </View>
                <Text className="mt-2 text-xs text-gray-400">Must be at least 8 characters</Text>
              </View>

              {/* Confirm Password Input */}
              <View className="mb-4">
                <Text className="mb-2 text-gray-700">Confirm Password</Text>
                <View className="flex-row items-center rounded-lg border border-gray-300 px-4 py-3">
                  <Lock size={20} color="#64748b" />
                  <TextInput
                    className="ml-3 flex-1 text-gray-700"
                    placeholder="Confirm your password"
                    placeholderTextColor="#94a3b8"
                    secureTextEntry
                    value={formData.confirmPassword}
                    onChangeText={(text) => handleChange('confirmPassword', text)}
                  />
                </View>
              </View>

              {/* Role Selection */}
              <View className="mb-6">
                <Text className="mb-2 text-gray-700">I am a:</Text>

                <View className="flex-row justify-between">
                  {/* Patient Option */}
                  <TouchableOpacity
                    className={`mx-1 flex-1 items-center rounded-lg border py-3 ${formData.role === 'PATIENT' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                    onPress={() => handleChange('role', 'PATIENT')}>
                    <Text
                      className={`font-medium ${formData.role === 'PATIENT' ? 'text-blue-600' : 'text-gray-600'}`}>
                      PATIENT
                    </Text>
                  </TouchableOpacity>

                  {/* HEALER Option */}
                  <TouchableOpacity
                    className={`mx-1 flex-1 items-center rounded-lg border py-3 ${formData.role === 'HEALER' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                    onPress={() => handleChange('role', 'HEALER')}>
                    <Text
                      className={`font-medium ${formData.role === 'HEALER' ? 'text-blue-600' : 'text-gray-600'}`}>
                      HEALER
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Sign Up Button */}
              <TouchableOpacity
                className="mb-4 items-center rounded-lg bg-blue-600 py-4 shadow-md shadow-blue-200"
                activeOpacity={0.8}
                onPress={handleSubmit}
                disabled={loading}>
                <Text className="text-lg font-semibold text-white">
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Text>
              </TouchableOpacity>

              {/* Terms and Conditions */}
              <Text className="px-4 text-center text-xs text-gray-500">
                By signing up, you agree to our
                <Text className="text-blue-500"> Terms of Service </Text>
                and
                <Text className="text-blue-500"> Privacy Policy</Text>
              </Text>
            </View>

            {/* Already have an account */}
            <View className="mt-4 flex-row justify-center">
              <Text className="text-gray-500">Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <Text className="font-semibold text-blue-600">Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
