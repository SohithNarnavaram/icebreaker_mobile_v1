import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Compass, Users, Calendar, MessageCircle, Bell, User } from 'lucide-react-native';

import { NotificationProvider, useNotifications } from './src/contexts/NotificationContext';
import { UserProvider } from './src/context/UserContext';
import IndexScreen from './src/pages/Index';
import SignInScreen from './src/pages/SignIn';
import SignUpScreen from './src/pages/SignUp';
import NearbyScreen from './src/pages/Nearby';
import AvailabilityScreen from './src/pages/Availability';
import ChatsScreen from './src/pages/Chats';
import RequestsScreen from './src/pages/Requests';
import DiscoverScreen from './src/pages/Discover';
import ProfileScreen from './src/pages/Profile';
import SettingsScreen from './src/pages/Settings';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const queryClient = new QueryClient();

// Custom Tab Bar Icon with Badge
const TabBarIconWithBadge = ({ 
  IconComponent, 
  color, 
  size, 
  badgeCount, 
  showDotOnly 
}: { 
  IconComponent: any; 
  color: string; 
  size: number; 
  badgeCount?: number; 
  showDotOnly?: boolean;
}) => {
  const hasBadge = badgeCount !== undefined && badgeCount > 0;

  return (
    <View style={styles.iconContainer}>
      <IconComponent color={color} size={size} />
      {hasBadge && (
        <>
          {showDotOnly ? (
            <View style={styles.dotBadge} />
          ) : (
            <View style={styles.countBadge}>
              <Text style={styles.badgeText}>{badgeCount > 9 ? '9+' : badgeCount}</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

function MainTabs() {
  const { unreadConversations, pendingRequests } = useNotifications();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#ff3f41',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: {
          backgroundColor: '#0D0D0D',
          borderTopWidth: 1,
          borderTopColor: '#2E2E2E',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabBarIconWithBadge IconComponent={Compass} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Nearby"
        component={NearbyScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabBarIconWithBadge IconComponent={Users} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Available"
        component={AvailabilityScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabBarIconWithBadge IconComponent={Calendar} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabBarIconWithBadge 
              IconComponent={MessageCircle} 
              color={color} 
              size={size}
              badgeCount={unreadConversations}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Requests"
        component={RequestsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabBarIconWithBadge 
              IconComponent={Bell} 
              color={color} 
              size={size}
              badgeCount={pendingRequests}
              showDotOnly={true}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabBarIconWithBadge IconComponent={User} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <NotificationProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="Index" component={IndexScreen} />
              <Stack.Screen name="SignIn" component={SignInScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
              <Stack.Screen name="Main" component={MainTabs} />
              <Stack.Screen name="Settings" component={SettingsScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </NotificationProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    position: 'relative',
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ff3f41',
    borderWidth: 1.5,
    borderColor: '#0D0D0D',
  },
  countBadge: {
    position: 'absolute',
    top: -4,
    right: -6,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    borderRadius: 9,
    backgroundColor: '#ff3f41',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#0D0D0D',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    lineHeight: 12,
  },
});
