import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, Image, Pressable, TextInput, Switch, StyleSheet, Alert } from "react-native";
import { ArrowLeft, User, Bell, Shield, Palette, MapPin, Trash2, Download, HelpCircle, Save, X, Camera, Edit3, Navigation } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import Slider from '@react-native-community/slider';
import { useUser } from '../context/UserContext';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { userProfile, userSettings, updateProfile, updateSettings } = useUser();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  
  // Local form state for editing
  const [formData, setFormData] = useState({
    name: userProfile.name,
    bio: userProfile.bio,
    gender: userProfile.gender,
  });

  const [proximityRadius, setProximityRadius] = useState(userSettings.proximityRadius);
  const [ageRange, setAgeRange] = useState({ min: userSettings.ageRangeMin, max: userSettings.ageRangeMax });

  // Update local form when context changes
  useEffect(() => {
    setFormData({
      name: userProfile.name,
      bio: userProfile.bio,
      gender: userProfile.gender,
    });
  }, [userProfile]);

  useEffect(() => {
    setProximityRadius(userSettings.proximityRadius);
    setAgeRange({ min: userSettings.ageRangeMin, max: userSettings.ageRangeMax });
  }, [userSettings]);

  const handleFormChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveProfile = () => {
    updateProfile({
      name: formData.name,
      bio: formData.bio,
      gender: formData.gender,
    });
    setIsEditingProfile(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleCancelEdit = () => {
    setFormData({
      name: userProfile.name,
      bio: userProfile.bio,
      gender: userProfile.gender,
    });
    setIsEditingProfile(false);
  };

  const handleSettingChange = (key: string, value: boolean, isProfileSetting: boolean = false) => {
    if (isProfileSetting) {
      updateProfile({ [key]: value });
    } else {
      updateSettings({ [key]: value });
    }
  };

  // Update connection settings only when slider interaction completes
  const handleProximityRadiusComplete = (value: number) => {
    updateSettings({ proximityRadius: value });
  };

  const handleAgeRangeComplete = () => {
    updateSettings({ ageRangeMin: ageRange.min, ageRangeMax: ageRange.max });
  };

  const settingSections = [
    {
      title: "Account",
      icon: User,
      items: [
        { title: "Public Profile", description: "Make your profile visible to other users", key: "profileVisibility", value: userProfile.profileVisibility, isProfileSetting: true },
        { title: "Show Age", description: "Display your age on your profile", key: "showAge", value: userProfile.showAge, isProfileSetting: true },
        { title: "Show Location", description: "Display your current location", key: "showLocation", value: userProfile.showLocation, isProfileSetting: true },
      ],
    },
    {
      title: "Notifications",
      icon: Bell,
      items: [
        { title: "Push Notifications", description: "Receive notifications on your device", key: "pushNotifications", value: userSettings.pushNotifications },
        { title: "Email Notifications", description: "Receive updates via email", key: "emailNotifications", value: userSettings.emailNotifications },
        { title: "Meetup Reminders", description: "Get reminded about upcoming meetups", key: "meetupReminders", value: userSettings.meetupReminders },
        { title: "New Message Alerts", description: "Notify when you receive new messages", key: "newMessageAlerts", value: userSettings.newMessageAlerts },
      ],
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      items: [
        { title: "Location Sharing", description: "Share your location for proximity features", key: "locationSharing", value: userSettings.locationSharing },
        { title: "Show Online Status", description: "Let others see when you're online", key: "showOnlineStatus", value: userSettings.showOnlineStatus },
        { title: "Allow Friend Requests", description: "Allow others to send you connection requests", key: "allowFriendRequests", value: userSettings.allowFriendRequests },
        { title: "Data Collection", description: "Help improve the app by sharing usage data", key: "dataCollection", value: userSettings.dataCollection },
      ],
    },
    {
      title: "App Preferences",
      icon: Palette,
      items: [
        { title: "Dark Mode", description: "Use dark theme throughout the app", key: "darkMode", value: userSettings.darkMode },
        { title: "Auto Location", description: "Automatically detect your location", key: "autoLocation", value: userSettings.autoLocation },
        { title: "Sound Effects", description: "Play sounds for interactions", key: "soundEffects", value: userSettings.soundEffects },
        { title: "Haptic Feedback", description: "Vibrate on touch interactions", key: "hapticFeedback", value: userSettings.hapticFeedback },
      ],
    },
  ];

  const actionItems = [
    { title: "Export Data", description: "Download your profile and meetup data", icon: Download },
    { title: "Help & Support", description: "Get help or contact support", icon: HelpCircle },
    { title: "Delete Account", description: "Permanently delete your account", icon: Trash2, variant: "destructive" as const },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft size={20} color="#E5E7EB" />
        </Pressable>
        <View>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Manage your app preferences</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Personal Information Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.iconContainer}>
              <User size={18} color="#ff3f41" />
            </View>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            {!isEditingProfile && (
              <Pressable onPress={() => setIsEditingProfile(true)} style={styles.editHeaderButton}>
                <Edit3 size={14} color="#ff3f41" />
                <Text style={styles.editHeaderButtonText}>Edit</Text>
              </Pressable>
            )}
          </View>

          <View style={styles.profilePictureSection}>
            <Image source={{ uri: userProfile.image }} style={styles.profilePicture} />
            <View style={styles.verifiedIcon}>
              <Text style={styles.verifiedText}>✓</Text>
            </View>
            {isEditingProfile && (
              <Pressable style={styles.changePhotoButton}>
                <Camera size={16} color="#ff3f41" />
                <Text style={styles.changePhotoText}>Change Photo</Text>
              </Pressable>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            {isEditingProfile ? (
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(value) => handleFormChange("name", value)}
                placeholderTextColor="#9CA3AF"
              />
            ) : (
              <View style={styles.readOnlyInput}>
                <Text style={styles.readOnlyText}>{userProfile.name}</Text>
              </View>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bio</Text>
            {isEditingProfile ? (
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.bio}
                onChangeText={(value) => handleFormChange("bio", value)}
                multiline
                numberOfLines={3}
                placeholderTextColor="#9CA3AF"
              />
            ) : (
              <View style={[styles.readOnlyInput, styles.textAreaReadOnly]}>
                <Text style={styles.readOnlyText}>{userProfile.bio}</Text>
              </View>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Gender</Text>
            {isEditingProfile ? (
              <View style={styles.genderToggleContainer}>
                {['Male', 'Female', 'Other'].map((gender) => (
                  <Pressable
                    key={gender}
                    style={[
                      styles.genderToggleButton,
                      formData.gender === gender && styles.genderToggleButtonActive
                    ]}
                    onPress={() => handleFormChange('gender', gender)}
                  >
                    <Text style={[
                      styles.genderToggleText,
                      formData.gender === gender && styles.genderToggleTextActive
                    ]}>
                      {gender}
                    </Text>
                  </Pressable>
                ))}
              </View>
            ) : (
              <View style={styles.readOnlyInput}>
                <Text style={styles.readOnlyText}>{userProfile.gender}</Text>
              </View>
            )}
          </View>

          {isEditingProfile && (
            <View style={styles.editActions}>
              <Pressable style={styles.cancelButton} onPress={handleCancelEdit}>
                <X size={16} color="#E5E7EB" />
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.saveButton} onPress={handleSaveProfile}>
                <Save size={16} color="#fff" />
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </Pressable>
            </View>
          )}
        </View>

        {/* Connection Settings Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.iconContainer}>
              <Navigation size={18} color="#ff3f41" />
            </View>
            <Text style={styles.sectionTitle}>Connection Settings</Text>
          </View>

          {/* Proximity Radius */}
          <View style={styles.sliderGroup}>
            <View style={styles.sliderHeader}>
              <View>
                <Text style={styles.sliderLabel}>Proximity Radius</Text>
                <Text style={styles.sliderDescription}>How far to search for nearby people</Text>
              </View>
              <Text style={styles.sliderValue}>{proximityRadius} km</Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={50}
              step={1}
              value={proximityRadius}
              onValueChange={setProximityRadius}
              onSlidingComplete={handleProximityRadiusComplete}
              minimumTrackTintColor="#ff3f41"
              maximumTrackTintColor="#2E2E2E"
              thumbTintColor="#E5E7EB"
            />
          </View>

          {/* Age Range */}
          <View style={styles.sliderGroup}>
            <View style={styles.sliderHeader}>
              <View>
                <Text style={styles.sliderLabel}>Age Range</Text>
                <Text style={styles.sliderDescription}>Age range for potential connections</Text>
              </View>
              <Text style={styles.sliderValue}>{ageRange.min}-{ageRange.max}</Text>
            </View>
            
            {/* Min Age Slider */}
            <View style={styles.dualSliderContainer}>
              <Text style={styles.dualSliderLabel}>Min: {ageRange.min}</Text>
              <Slider
                style={styles.slider}
                minimumValue={18}
                maximumValue={ageRange.max - 1}
                step={1}
                value={ageRange.min}
                onValueChange={(value) => setAgeRange(prev => ({ ...prev, min: value }))}
                onSlidingComplete={handleAgeRangeComplete}
                minimumTrackTintColor="#7856d4"
                maximumTrackTintColor="#2E2E2E"
                thumbTintColor="#E5E7EB"
              />
            </View>

            {/* Max Age Slider */}
            <View style={styles.dualSliderContainer}>
              <Text style={styles.dualSliderLabel}>Max: {ageRange.max}</Text>
              <Slider
                style={styles.slider}
                minimumValue={ageRange.min + 1}
                maximumValue={80}
                step={1}
                value={ageRange.max}
                onValueChange={(value) => setAgeRange(prev => ({ ...prev, max: value }))}
                onSlidingComplete={handleAgeRangeComplete}
                minimumTrackTintColor="#7856d4"
                maximumTrackTintColor="#2E2E2E"
                thumbTintColor="#E5E7EB"
              />
            </View>
          </View>
        </View>

        {/* Settings Sections */}
        {settingSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.iconContainer}>
                <section.icon size={18} color="#ff3f41" />
              </View>
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
            
            {section.items.map((item, itemIndex) => (
              <View 
                key={itemIndex} 
                style={[
                  styles.settingRow, 
                  itemIndex === section.items.length - 1 && styles.settingRowLast
                ]}
              >
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>{item.title}</Text>
                  <Text style={styles.settingDescription}>{item.description}</Text>
                </View>
                <Switch
                  value={item.value as boolean}
                  onValueChange={(value) => handleSettingChange(item.key, value, (item as any).isProfileSetting)}
                  trackColor={{ false: '#767577', true: '#ff3f41' }}
                  thumbColor="#fff"
                />
              </View>
            ))}
          </View>
        ))}

        {/* Action Items */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.iconContainer}>
              <HelpCircle size={18} color="#ff3f41" />
            </View>
            <Text style={styles.sectionTitle}>Data & Support</Text>
          </View>
          {actionItems.map((item, index) => (
            <Pressable
              key={index}
              style={[styles.actionButton, item.variant === "destructive" && styles.destructiveAction]}
              onPress={() => Alert.alert(item.title, item.description)}
            >
              <View style={[styles.actionIcon, item.variant === "destructive" && styles.destructiveIcon]}>
                <item.icon
                  size={18}
                  color={item.variant === "destructive" ? "#dc2626" : "#ff3f41"}
                />
              </View>
              <View style={styles.actionInfo}>
                <Text style={[styles.actionTitle, item.variant === "destructive" && styles.destructiveText]}>
                  {item.title}
                </Text>
                <Text style={styles.actionDescription}>{item.description}</Text>
              </View>
            </Pressable>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Icebreaker App v1.0.0</Text>
          <Text style={styles.footerText}>© 2025 All rights reserved</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 16, padding: 20, borderBottomWidth: 1, borderBottomColor: '#2E2E2E' },
  backButton: { width: 40, height: 40, backgroundColor: '#0D0D0D', borderWidth: 1, borderColor: '#2E2E2E', borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' },
  subtitle: { fontSize: 13, color: '#9CA3AF', marginTop: 2 },
  content: { flex: 1, padding: 16 },
  section: { marginBottom: 20, padding: 20, backgroundColor: '#0D0D0D', borderRadius: 20, borderWidth: 1, borderColor: '#2E2E2E' },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  iconContainer: { width: 32, height: 32, backgroundColor: 'rgba(255, 63, 65, 0.15)', borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  sectionTitle: { fontSize: 17, fontWeight: '600', color: '#FFFFFF', flex: 1 },
  editHeaderButton: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 6, backgroundColor: 'rgba(255, 63, 65, 0.15)', borderRadius: 8 },
  editHeaderButtonText: { fontSize: 12, color: '#ff3f41', fontWeight: '600' },
  profilePictureSection: { alignItems: 'center', marginBottom: 20, position: 'relative' },
  profilePicture: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: '#2E2E2E' },
  verifiedIcon: { position: 'absolute', top: 0, right: '35%', width: 28, height: 28, backgroundColor: '#ff3f41', borderRadius: 14, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#000000' },
  verifiedText: { fontSize: 14, color: '#fff', fontWeight: 'bold' },
  changePhotoButton: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16, paddingVertical: 8, backgroundColor: 'rgba(255, 63, 65, 0.15)', borderRadius: 12, marginTop: 8 },
  changePhotoText: { fontSize: 14, color: '#ff3f41', fontWeight: '600' },
  inputGroup: { marginBottom: 18 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 10, color: '#E5E7EB' },
  input: { borderWidth: 1, borderColor: '#2E2E2E', borderRadius: 12, padding: 14, fontSize: 14, color: '#E5E7EB', backgroundColor: '#1A1A1A' },
  readOnlyInput: { borderWidth: 1, borderColor: '#2E2E2E', borderRadius: 12, padding: 14, backgroundColor: '#1A1A1A' },
  readOnlyText: { fontSize: 14, color: '#E5E7EB' },
  textArea: { height: 90, textAlignVertical: 'top' },
  textAreaReadOnly: { height: 90 },
  editActions: { flexDirection: 'row', gap: 12, marginTop: 12 },
  cancelButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, paddingHorizontal: 12, borderWidth: 1, borderColor: '#2E2E2E', borderRadius: 12, backgroundColor: '#1A1A1A' },
  cancelButtonText: { color: '#E5E7EB', fontWeight: '600', fontSize: 14 },
  saveButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, paddingHorizontal: 12, backgroundColor: '#ff3f41', borderRadius: 12 },
  saveButtonText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(46, 46, 46, 0.5)' },
  settingRowLast: { borderBottomWidth: 0 },
  settingInfo: { flex: 1, paddingRight: 12 },
  settingTitle: { fontSize: 15, fontWeight: '600', color: '#E5E7EB', marginBottom: 5 },
  settingDescription: { fontSize: 13, color: '#9CA3AF', lineHeight: 18 },
  actionButton: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 16, paddingHorizontal: 16, backgroundColor: 'rgba(26, 26, 26, 0.5)', borderRadius: 14, borderWidth: 1, borderColor: '#2E2E2E', marginBottom: 10 },
  actionIcon: { width: 44, height: 44, backgroundColor: 'rgba(255, 63, 65, 0.15)', borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  actionInfo: { flex: 1 },
  actionTitle: { fontSize: 15, fontWeight: '600', color: '#E5E7EB', marginBottom: 4 },
  actionDescription: { fontSize: 13, color: '#9CA3AF', lineHeight: 18 },
  destructiveAction: { borderColor: 'rgba(220, 38, 38, 0.3)', backgroundColor: 'rgba(220, 38, 38, 0.08)' },
  destructiveIcon: { backgroundColor: 'rgba(220, 38, 38, 0.15)' },
  destructiveText: { color: '#dc2626' },
  footer: { alignItems: 'center', paddingVertical: 32, paddingBottom: 40 },
  footerText: { fontSize: 12, color: '#6B7280', marginBottom: 4 },
  // Slider Styles
  sliderGroup: { marginBottom: 24 },
  sliderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  sliderLabel: { fontSize: 15, fontWeight: '600', color: '#E5E7EB', marginBottom: 5 },
  sliderDescription: { fontSize: 13, color: '#9CA3AF', lineHeight: 18 },
  sliderValue: { fontSize: 16, fontWeight: 'bold', color: '#ff3f41', marginLeft: 12 },
  slider: { width: '100%', height: 40 },
  dualSliderContainer: { marginTop: 12 },
  dualSliderLabel: { fontSize: 13, fontWeight: '600', color: '#9CA3AF', marginBottom: 8 },
  // Gender Toggle Styles
  genderToggleContainer: { flexDirection: 'row', gap: 10, justifyContent: 'space-between' },
  genderToggleButton: { 
    flex: 1, 
    paddingVertical: 14, 
    paddingHorizontal: 16, 
    backgroundColor: '#1A1A1A', 
    borderWidth: 1, 
    borderColor: '#2E2E2E', 
    borderRadius: 12, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  genderToggleButtonActive: { 
    backgroundColor: '#ff3f41', 
    borderColor: '#ff3f41',
  },
  genderToggleText: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#9CA3AF',
  },
  genderToggleTextActive: { 
    color: '#FFFFFF',
  },
});

export default SettingsScreen;
