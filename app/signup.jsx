import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Mail, Lock, Phone } from 'lucide-react-native';

export default function SignUpPage() {
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
              {/* <Image
                source={require('./assets/logo.png')} // Replace with your logo
                className="mb-4 h-28 w-28"
              /> */}
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
                  />
                </View>
                <Text className="mt-2 text-xs text-gray-400">Must be at least 8 characters</Text>
              </View>

              {/* Confirm Password Input */}
              <View className="mb-6">
                <Text className="mb-2 text-gray-700">Confirm Password</Text>
                <View className="flex-row items-center rounded-lg border border-gray-300 px-4 py-3">
                  <Lock size={20} color="#64748b" />
                  <TextInput
                    className="ml-3 flex-1 text-gray-700"
                    placeholder="Confirm your password"
                    placeholderTextColor="#94a3b8"
                    secureTextEntry
                  />
                </View>
              </View>

              {/* Sign Up Button */}
              <TouchableOpacity
                className="mb-4 items-center rounded-lg bg-blue-600 py-4 shadow-md shadow-blue-200"
                activeOpacity={0.8}>
                <Text className="text-lg font-semibold text-white">Create Account</Text>
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
              <TouchableOpacity>
                <Text className="font-semibold text-blue-600">Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
