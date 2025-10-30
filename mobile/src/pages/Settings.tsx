import React, { useState } from "react";
import { View, Text, SafeAreaView, ScrollView, Image, Pressable, TextInput, Switch, StyleSheet, Alert } from "react-native";
import { ArrowLeft, User, Bell, Shield, Palette, MapPin, Trash2, Download, HelpCircle, Save, X, Camera, Edit3 } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [settings, setSettings] = useState({
    name: "Aditi Sharma",
    bio: "Coffee lover, startup enthusiast, and always up for a good conversation! ☕️",
    gender: "Female",
    profilePicture: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces",
    profileVisibility: true,
    showAge: true,
    showLocation: true,
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
  });

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const settingSections = [
    {
      title: "Account",
      icon: User,
      items: [
        { title: "Public Profile", description: "Make your profile visible to other users", key: "profileVisibility", value: settings.profileVisibility },
        { title: "Show Age", description: "Display your age on your profile", key: "showAge", value: settings.showAge },
        { title: "Show Location", description: "Display your current location", key: "showLocation", value: settings.showLocation },
      ],
    },
    {
      title: "Notifications",
      icon: Bell,
      items: [
        { title: "Push Notifications", description: "Receive notifications on your device", key: "pushNotifications", value: settings.pushNotifications },
        { title: "Email Notifications", description: "Receive updates via email", key: "emailNotifications", value: settings.emailNotifications },
        { title: "Meetup Reminders", description: "Get reminded about upcoming meetups", key: "meetupReminders", value: settings.meetupReminders },
        { title: "New Message Alerts", description: "Notify when you receive new messages", key: "newMessageAlerts", value: settings.newMessageAlerts },
      ],
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      items: [
        { title: "Location Sharing", description: "Share your location for proximity features", key: "locationSharing", value: settings.locationSharing },
        { title: "Show Online Status", description: "Let others see when you're online", key: "showOnlineStatus", value: settings.showOnlineStatus },
        { title: "Allow Friend Requests", description: "Allow others to send you connection requests", key: "allowFriendRequests", value: settings.allowFriendRequests },
        { title: "Data Collection", description: "Help improve the app by sharing usage data", key: "dataCollection", value: settings.dataCollection },
      ],
    },
    {
      title: "App Preferences",
      icon: Palette,
      items: [
        { title: "Dark Mode", description: "Use dark theme throughout the app", key: "darkMode", value: settings.darkMode },
        { title: "Auto Location", description: "Automatically detect your location", key: "autoLocation", value: settings.autoLocation },
        { title: "Sound Effects", description: "Play sounds for interactions", key: "soundEffects", value: settings.soundEffects },
        { title: "Haptic Feedback", description: "Vibrate on touch interactions", key: "hapticFeedback", value: settings.hapticFeedback },
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
            <Image source={{ uri: settings.profilePicture }} style={styles.profilePicture} />
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
                value={settings.name}
                onChangeText={(value) => handleSettingChange("name", value)}
                placeholderTextColor="#9CA3AF"
              />
            ) : (
              <View style={styles.readOnlyInput}>
                <Text style={styles.readOnlyText}>{settings.name}</Text>
              </View>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bio</Text>
            {isEditingProfile ? (
              <TextInput
                style={[styles.input, styles.textArea]}
                value={settings.bio}
                onChangeText={(value) => handleSettingChange("bio", value)}
                multiline
                numberOfLines={3}
                placeholderTextColor="#9CA3AF"
              />
            ) : (
              <View style={[styles.readOnlyInput, styles.textAreaReadOnly]}>
                <Text style={styles.readOnlyText}>{settings.bio}</Text>
              </View>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.readOnlyInput}>
              <Text style={styles.readOnlyText}>{settings.gender}</Text>
            </View>
          </View>

          {isEditingProfile && (
            <View style={styles.editActions}>
              <Pressable style={styles.cancelButton} onPress={() => setIsEditingProfile(false)}>
                <X size={16} color="#E5E7EB" />
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.saveButton} onPress={() => setIsEditingProfile(false)}>
                <Save size={16} color="#fff" />
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </Pressable>
            </View>
          )}
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
              <View key={itemIndex} style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>{item.title}</Text>
                  <Text style={styles.settingDescription}>{item.description}</Text>
                </View>
                <Switch
                  value={item.value as boolean}
                  onValueChange={(value) => handleSettingChange(item.key, value)}
                  trackColor={{ false: '#767577', true: '#ff3f41' }}
                  thumbColor="#fff"
                />
              </View>
            ))}
          </View>
        ))}

        {/* Action Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data & Support</Text>
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
  title: { fontSize: 24, fontWeight: 'bold', color: '#E5E7EB' },
  subtitle: { fontSize: 14, color: '#9CA3AF' },
  content: { flex: 1, padding: 16 },
  section: { marginBottom: 24, padding: 16, backgroundColor: '#0D0D0D', borderRadius: 16, borderWidth: 1, borderColor: '#2E2E2E' },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  iconContainer: { width: 32, height: 32, backgroundColor: '#ff3f41', opacity: 0.1, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#E5E7EB', flex: 1 },
  editHeaderButton: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#ff3f41', opacity: 0.1, borderRadius: 8 },
  editHeaderButtonText: { fontSize: 12, color: '#ff3f41', fontWeight: '600' },
  profilePictureSection: { alignItems: 'center', marginBottom: 16 },
  profilePicture: { width: 80, height: 80, borderRadius: 40, marginBottom: 8 },
  verifiedIcon: { position: 'absolute', bottom: 60, right: 140, width: 24, height: 24, backgroundColor: '#ff3f41', borderRadius: 12, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#000000' },
  verifiedText: { fontSize: 12, color: '#fff', fontWeight: 'bold' },
  changePhotoButton: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16, paddingVertical: 8, backgroundColor: '#ff3f41', opacity: 0.1, borderRadius: 12 },
  changePhotoText: { fontSize: 14, color: '#ff3f41', fontWeight: '600' },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 8, color: '#E5E7EB' },
  input: { borderWidth: 1, borderColor: '#2E2E2E', borderRadius: 12, padding: 12, fontSize: 14, color: '#E5E7EB', backgroundColor: '#1A1A1A' },
  readOnlyInput: { borderWidth: 1, borderColor: '#2E2E2E', borderRadius: 12, padding: 12, backgroundColor: '#1A1A1A' },
  readOnlyText: { fontSize: 14, color: '#E5E7EB' },
  textArea: { height: 80, textAlignVertical: 'top' },
  textAreaReadOnly: { height: 80 },
  editActions: { flexDirection: 'row', gap: 12, marginTop: 8 },
  cancelButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 12, borderWidth: 2, borderColor: '#2E2E2E', borderRadius: 12 },
  cancelButtonText: { color: '#E5E7EB', fontWeight: '600', fontSize: 14 },
  saveButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 12, backgroundColor: '#ff3f41', borderRadius: 12 },
  saveButtonText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 },
  settingInfo: { flex: 1 },
  settingTitle: { fontSize: 14, fontWeight: '600', color: '#E5E7EB', marginBottom: 4 },
  settingDescription: { fontSize: 12, color: '#9CA3AF' },
  actionButton: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16, backgroundColor: '#0D0D0D', borderRadius: 16, borderWidth: 1, borderColor: '#2E2E2E', marginBottom: 12 },
  actionIcon: { width: 40, height: 40, backgroundColor: '#ff3f41', opacity: 0.1, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  actionInfo: { flex: 1 },
  actionTitle: { fontSize: 14, fontWeight: '600', color: '#E5E7EB', marginBottom: 4 },
  actionDescription: { fontSize: 12, color: '#9CA3AF' },
  destructiveAction: { borderColor: 'rgba(220, 38, 38, 0.2)', backgroundColor: 'rgba(220, 38, 38, 0.05)' },
  destructiveIcon: { backgroundColor: 'rgba(220, 38, 38, 0.1)' },
  destructiveText: { color: '#dc2626' },
  footer: { alignItems: 'center', paddingVertical: 24 },
  footerText: { fontSize: 12, color: '#9CA3AF', marginBottom: 4 },
});

export default SettingsScreen;
