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
import { Lock, Mail } from 'lucide-react-native';

export default function SignInPage() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View className="flex-1 justify-center px-6 py-8">
            {/* Logo Header */}
            <View className="mb-10 items-center">
              {/* <Image
                source={require('./assets/logo.png')} // Replace with your logo
                className="mb-4 h-32 w-32"
              /> */}
              <Text className="text-3xl font-bold text-blue-600">Welcome Back</Text>
              <Text className="mt-2 text-gray-500">Sign in to continue</Text>
            </View>

            {/* Form */}
            <View className="mb-6">
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
              {/* <View className="mb-8 flex-row justify-center gap-4">
              <TouchableOpacity className="rounded-full border border-gray-300 p-3">
                <Image
                  source={require('./assets/google.png')} // Replace with your icon
                  className="h-6 w-6"
                />
              </TouchableOpacity>
              <TouchableOpacity className="rounded-full border border-gray-300 p-3">
                <Image
                  source={require('./assets/facebook.png')} // Replace with your icon
                  className="h-6 w-6"
                />
              </TouchableOpacity>
              <TouchableOpacity className="rounded-full border border-gray-300 p-3">
                <Image
                  source={require('./assets/apple.png')} // Replace with your icon
                  className="h-6 w-6"
                />
              </TouchableOpacity>
            </View> */}
              Input */}
              <View className="mb-6">
                <Text className="mb-2 text-gray-700">Password</Text>
                <View className="flex-row items-center rounded-lg border border-gray-300 px-4 py-3">
                  <Lock size={20} color="#64748b" />
                  <TextInput
                    className="ml-3 flex-1 text-gray-700"
                    placeholder="Enter your password"
                    placeholderTextColor="#94a3b8"
                    secureTextEntry
                  />
                </View>
                <TouchableOpacity className="mt-2 self-end">
                  <Text className="text-sm text-blue-500">Forgot password?</Text>
                </TouchableOpacity>
              </View>
              {/* Sign In Button */}
              <TouchableOpacity
                className="items-center rounded-lg bg-blue-600 py-4 shadow-md shadow-blue-200"
                activeOpacity={0.8}>
                <Text className="text-lg font-semibold text-white">Sign In</Text>
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View className="my-6 flex-row items-center">
              <View className="h-px flex-1 bg-gray-300" />
              <Text className="mx-4 text-gray-400">OR</Text>
              <View className="h-px flex-1 bg-gray-300" />
            </View>

            {/* Social Login */}
            {/* <View className="mb-8 flex-row justify-center gap-4">
              <TouchableOpacity className="rounded-full border border-gray-300 p-3">
                <Image
                  source={require('./assets/google.png')} // Replace with your icon
                  className="h-6 w-6"
                />
              </TouchableOpacity>
              <TouchableOpacity className="rounded-full border border-gray-300 p-3">
                <Image
                  source={require('./assets/facebook.png')} // Replace with your icon
                  className="h-6 w-6"
                />
              </TouchableOpacity>
              <TouchableOpacity className="rounded-full border border-gray-300 p-3">
                <Image
                  source={require('./assets/apple.png')} // Replace with your icon
                  className="h-6 w-6"
                />
              </TouchableOpacity>
            </View> */}

            {/* Sign Up Link */}
            <View className="flex-row justify-center">
              <Text className="text-gray-500">Don't have an account? </Text>
              <TouchableOpacity>
                <Text className="font-semibold text-blue-600">Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
