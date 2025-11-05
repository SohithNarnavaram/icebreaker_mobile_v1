import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserProfile {
  name: string;
  bio: string;
  gender: string;
  age: number;
  locality: string;
  interests: string[];
  preferences: string[];
  trustScore: number;
  totalRatings: number;
  image: string;
  profileVisibility: boolean;
  showAge: boolean;
  showLocation: boolean;
}

interface UserSettings {
  pushNotifications: boolean;
  emailNotifications: boolean;
  meetupReminders: boolean;
  newMessageAlerts: boolean;
  locationSharing: boolean;
  showOnlineStatus: boolean;
  allowFriendRequests: boolean;
  dataCollection: boolean;
  darkMode: boolean;
  autoLocation: boolean;
  soundEffects: boolean;
  hapticFeedback: boolean;
  proximityRadius: number;
  ageRangeMin: number;
  ageRangeMax: number;
}

interface UserContextType {
  userProfile: UserProfile;
  userSettings: UserSettings;
  updateProfile: (updates: Partial<UserProfile>) => void;
  updateSettings: (updates: Partial<UserSettings>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Aditi Sharma",
    bio: "Coffee lover, startup enthusiast, and always up for a good conversation! ☕️",
    gender: "Female",
    age: 25,
    locality: "HSR Layout, Bangalore",
    interests: ["Books", "Coffee", "Startup", "Travel", "Photography"],
    preferences: ["Tech", "Books", "Female", "Male"],
    trustScore: 4.7,
    totalRatings: 23,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces",
    profileVisibility: true,
    showAge: true,
    showLocation: true,
  });

  const [userSettings, setUserSettings] = useState<UserSettings>({
    pushNotifications: true,
    emailNotifications: false,
    meetupReminders: true,
    newMessageAlerts: true,
    locationSharing: true,
    showOnlineStatus: true,
    allowFriendRequests: true,
    dataCollection: false,
    darkMode: true,
    autoLocation: true,
    soundEffects: true,
    hapticFeedback: true,
    proximityRadius: 5,
    ageRangeMin: 18,
    ageRangeMax: 35,
  });

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updates }));
  };

  const updateSettings = (updates: Partial<UserSettings>) => {
    setUserSettings(prev => ({ ...prev, ...updates }));
  };

  return (
    <UserContext.Provider value={{ userProfile, userSettings, updateProfile, updateSettings }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

