import React from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { Heart, Star } from "lucide-react-native";

const DiscoverScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-4">
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-900 mb-2">Discover</Text>
          <Text className="text-gray-600">Find new connections</Text>
        </View>

        <ScrollView className="flex-1">
          <View className="bg-pink-50 p-4 rounded-lg mb-4">
            <View className="flex-row items-center mb-2">
              <Heart className="w-5 h-5 text-pink-600 mr-2" />
              <Text className="text-lg font-semibold text-gray-900">Recommended for You</Text>
            </View>
            <Text className="text-gray-600">Based on your interests and location</Text>
          </View>

          <View className="space-y-3">
            <View className="bg-white p-4 rounded-lg border border-gray-200">
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-indigo-500 rounded-full mr-3" />
                <View className="flex-1">
                  <Text className="font-semibold text-gray-900">Emma Wilson</Text>
                  <Text className="text-sm text-gray-600">Photography enthusiast • 0.3 miles</Text>
                  <View className="flex-row items-center mt-1">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <Text className="text-xs text-gray-500">4.8 rating</Text>
                  </View>
                </View>
              </View>
            </View>

            <View className="bg-white p-4 rounded-lg border border-gray-200">
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-teal-500 rounded-full mr-3" />
                <View className="flex-1">
                  <Text className="font-semibold text-gray-900">James Rodriguez</Text>
                  <Text className="text-sm text-gray-600">Fitness coach • 0.7 miles</Text>
                  <View className="flex-row items-center mt-1">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <Text className="text-xs text-gray-500">4.9 rating</Text>
                  </View>
                </View>
              </View>
            </View>

            <View className="bg-white p-4 rounded-lg border border-gray-200">
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-rose-500 rounded-full mr-3" />
                <View className="flex-1">
                  <Text className="font-semibold text-gray-900">Lisa Chen</Text>
                  <Text className="text-sm text-gray-600">Food blogger • 1.2 miles</Text>
                  <View className="flex-row items-center mt-1">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <Text className="text-xs text-gray-500">4.7 rating</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DiscoverScreen;
