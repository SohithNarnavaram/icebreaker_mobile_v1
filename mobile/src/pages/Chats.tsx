import React from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { MessageCircle, Users } from "lucide-react-native";

const ChatsScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-4">
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-900 mb-2">Chats</Text>
          <Text className="text-gray-600">Your conversations</Text>
        </View>

        <ScrollView className="flex-1">
          <View className="space-y-3">
            <View className="bg-white p-4 rounded-lg border border-gray-200">
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-green-500 rounded-full mr-3" />
                <View className="flex-1">
                  <Text className="font-semibold text-gray-900">Sarah Chen</Text>
                  <Text className="text-sm text-gray-600">Hey! Want to grab coffee?</Text>
                </View>
                <View className="bg-red-500 w-6 h-6 rounded-full items-center justify-center">
                  <Text className="text-white text-xs font-bold">2</Text>
                </View>
              </View>
            </View>

            <View className="bg-white p-4 rounded-lg border border-gray-200">
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-purple-500 rounded-full mr-3" />
                <View className="flex-1">
                  <Text className="font-semibold text-gray-900">Alex Kumar</Text>
                  <Text className="text-sm text-gray-600">Thanks for the great conversation!</Text>
                </View>
              </View>
            </View>

            <View className="bg-white p-4 rounded-lg border border-gray-200">
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-orange-500 rounded-full mr-3" />
                <View className="flex-1">
                  <Text className="font-semibold text-gray-900">Priya Singh</Text>
                  <Text className="text-sm text-gray-600">See you tomorrow!</Text>
                </View>
                <View className="bg-red-500 w-6 h-6 rounded-full items-center justify-center">
                  <Text className="text-white text-xs font-bold">1</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ChatsScreen;
