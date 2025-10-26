import React from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { Calendar, Clock } from "lucide-react-native";

const AvailabilityScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-4">
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-900 mb-2">Availability</Text>
          <Text className="text-gray-600">Set your schedule and availability</Text>
        </View>

        <ScrollView className="flex-1">
          <View className="bg-green-50 p-4 rounded-lg mb-4">
            <View className="flex-row items-center mb-2">
              <Calendar className="w-5 h-5 text-green-600 mr-2" />
              <Text className="text-lg font-semibold text-gray-900">Today's Schedule</Text>
            </View>
            <Text className="text-gray-600">You're available for meetups</Text>
          </View>

          <View className="space-y-3">
            <View className="bg-white p-4 rounded-lg border border-gray-200">
              <View className="flex-row items-center">
                <Clock className="w-5 h-5 text-blue-600 mr-3" />
                <View className="flex-1">
                  <Text className="font-semibold text-gray-900">Morning (9:00 AM - 12:00 PM)</Text>
                  <Text className="text-sm text-gray-600">Available for coffee meetups</Text>
                </View>
              </View>
            </View>

            <View className="bg-white p-4 rounded-lg border border-gray-200">
              <View className="flex-row items-center">
                <Clock className="w-5 h-5 text-green-600 mr-3" />
                <View className="flex-1">
                  <Text className="font-semibold text-gray-900">Afternoon (2:00 PM - 5:00 PM)</Text>
                  <Text className="text-sm text-gray-600">Available for lunch meetings</Text>
                </View>
              </View>
            </View>

            <View className="bg-white p-4 rounded-lg border border-gray-200">
              <View className="flex-row items-center">
                <Clock className="w-5 h-5 text-purple-600 mr-3" />
                <View className="flex-1">
                  <Text className="font-semibold text-gray-900">Evening (7:00 PM - 9:00 PM)</Text>
                  <Text className="text-sm text-gray-600">Available for dinner plans</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AvailabilityScreen;
