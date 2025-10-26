import React from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { User, Settings, Bell } from "lucide-react-native";

const ProfileScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-4">
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-900 mb-2">Profile</Text>
          <Text className="text-gray-600">Manage your account</Text>
        </View>

        <ScrollView className="flex-1">
          <View className="bg-blue-50 p-4 rounded-lg mb-4">
            <View className="flex-row items-center">
              <View className="w-16 h-16 bg-blue-500 rounded-full mr-4" />
              <View className="flex-1">
                <Text className="text-xl font-bold text-gray-900">John Doe</Text>
                <Text className="text-gray-600">Verified member</Text>
                <View className="flex-row items-center mt-1">
                  <Bell className="w-4 h-4 text-blue-600 mr-1" />
                  <Text className="text-xs text-gray-500">1 notification</Text>
                </View>
              </View>
            </View>
          </View>

          <View className="space-y-3">
            <View className="bg-white p-4 rounded-lg border border-gray-200">
              <View className="flex-row items-center">
                <User className="w-5 h-5 text-gray-600 mr-3" />
                <View className="flex-1">
                  <Text className="font-semibold text-gray-900">Personal Information</Text>
                  <Text className="text-sm text-gray-600">Update your profile details</Text>
                </View>
              </View>
            </View>

            <View className="bg-white p-4 rounded-lg border border-gray-200">
              <View className="flex-row items-center">
                <Settings className="w-5 h-5 text-gray-600 mr-3" />
                <View className="flex-1">
                  <Text className="font-semibold text-gray-900">Preferences</Text>
                  <Text className="text-sm text-gray-600">Manage your app settings</Text>
                </View>
              </View>
            </View>

            <View className="bg-white p-4 rounded-lg border border-gray-200">
              <View className="flex-row items-center">
                <Bell className="w-5 h-5 text-gray-600 mr-3" />
                <View className="flex-1">
                  <Text className="font-semibold text-gray-900">Notifications</Text>
                  <Text className="text-sm text-gray-600">Control your notifications</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
