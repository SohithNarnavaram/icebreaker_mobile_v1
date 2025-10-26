import React from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { Users, Clock } from "lucide-react-native";

const RequestsScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-4">
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-900 mb-2">Requests</Text>
          <Text className="text-gray-600">Pending meetup requests</Text>
        </View>

        <ScrollView className="flex-1">
          <View className="bg-yellow-50 p-4 rounded-lg mb-4">
            <View className="flex-row items-center mb-2">
              <Users className="w-5 h-5 text-yellow-600 mr-2" />
              <Text className="text-lg font-semibold text-gray-900">New Requests</Text>
            </View>
            <Text className="text-gray-600">You have 4 pending requests</Text>
          </View>

          <View className="space-y-3">
            <View className="bg-white p-4 rounded-lg border border-gray-200">
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-blue-500 rounded-full mr-3" />
                <View className="flex-1">
                  <Text className="font-semibold text-gray-900">Maya Patel</Text>
                  <Text className="text-sm text-gray-600">Wants to meet for coffee</Text>
                </View>
                <Clock className="w-5 h-5 text-gray-400" />
              </View>
            </View>

            <View className="bg-white p-4 rounded-lg border border-gray-200">
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-green-500 rounded-full mr-3" />
                <View className="flex-1">
                  <Text className="font-semibold text-gray-900">Rohit Sharma</Text>
                  <Text className="text-sm text-gray-600">Interested in lunch meetup</Text>
                </View>
                <Clock className="w-5 h-5 text-gray-400" />
              </View>
            </View>

            <View className="bg-white p-4 rounded-lg border border-gray-200">
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-purple-500 rounded-full mr-3" />
                <View className="flex-1">
                  <Text className="font-semibold text-gray-900">Kavya Reddy</Text>
                  <Text className="text-sm text-gray-600">Available for evening walk</Text>
                </View>
                <Clock className="w-5 h-5 text-gray-400" />
              </View>
            </View>

            <View className="bg-white p-4 rounded-lg border border-gray-200">
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-orange-500 rounded-full mr-3" />
                <View className="flex-1">
                  <Text className="font-semibold text-gray-900">Arjun Singh</Text>
                  <Text className="text-sm text-gray-600">Wants to discuss shared interests</Text>
                </View>
                <Clock className="w-5 h-5 text-gray-400" />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default RequestsScreen;
