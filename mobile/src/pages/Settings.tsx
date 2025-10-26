import React from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { Settings, Bell, Shield, HelpCircle } from "lucide-react-native";

const SettingsScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-4">
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-900 mb-2">Settings</Text>
          <Text className="text-gray-600">Customize your experience</Text>
        </View>

        <ScrollView className="flex-1">
          <View className="space-y-3">
            <View className="bg-white p-4 rounded-lg border border-gray-200">
              <View className="flex-row items-center">
                <Bell className="w-5 h-5 text-gray-600 mr-3" />
                <View className="flex-1">
                  <Text className="font-semibold text-gray-900">Notifications</Text>
                  <Text className="text-sm text-gray-600">Manage notification preferences</Text>
                </View>
              </View>
            </View>

            <View className="bg-white p-4 rounded-lg border border-gray-200">
              <View className="flex-row items-center">
                <Shield className="w-5 h-5 text-gray-600 mr-3" />
                <View className="flex-1">
                  <Text className="font-semibold text-gray-900">Privacy & Security</Text>
                  <Text className="text-sm text-gray-600">Control your privacy settings</Text>
                </View>
              </View>
            </View>

            <View className="bg-white p-4 rounded-lg border border-gray-200">
              <View className="flex-row items-center">
                <Settings className="w-5 h-5 text-gray-600 mr-3" />
                <View className="flex-1">
                  <Text className="font-semibold text-gray-900">Account Settings</Text>
                  <Text className="text-sm text-gray-600">Manage your account</Text>
                </View>
              </View>
            </View>

            <View className="bg-white p-4 rounded-lg border border-gray-200">
              <View className="flex-row items-center">
                <HelpCircle className="w-5 h-5 text-gray-600 mr-3" />
                <View className="flex-1">
                  <Text className="font-semibold text-gray-900">Help & Support</Text>
                  <Text className="text-sm text-gray-600">Get help and contact support</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
