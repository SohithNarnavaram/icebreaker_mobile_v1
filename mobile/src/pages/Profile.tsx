import React, { useState, useRef } from "react";
import { View, Text, SafeAreaView, ScrollView, Image, Pressable, StyleSheet, Modal, Animated } from "react-native";
import { Edit, Instagram, Linkedin, MapPin, Star, Calendar, LogOut, Heart, CheckCircle, Clock, Users, ArrowRight, X } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'interested' | 'scheduled' | 'requested' | 'accepted' | 'past'>('all');
  const scrollY = useRef(new Animated.Value(0)).current;
  
  // Animation threshold - start transitioning after scrolling 50px
  const HEADER_SCROLL_DISTANCE = 100;
  
  const headerImageScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.8],
    extrapolate: 'clamp',
  });
  
  const headerImageTranslateX = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -120],
    extrapolate: 'clamp',
  });
  
  const headerImageTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -16],
    extrapolate: 'clamp',
  });
  
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE * 0.5, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });
  
  const mainImageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE * 0.7, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.3, 0],
    extrapolate: 'clamp',
  });
  
  const titleTranslateX = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 156],
    extrapolate: 'clamp',
  });

  const userProfile = {
    name: "Aditi Sharma",
    age: 25,
    gender: "Female",
    locality: "HSR Layout, Bangalore",
    interests: ["Books", "Coffee", "Startup", "Travel", "Photography"],
    preferences: ["Tech", "Books", "Female", "Male"],
    trustScore: 4.7,
    totalRatings: 23,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces",
  };

  const upcomingMeetups = [
    { id: 1, name: "Sarah Chen", time: "Today, 4:00 PM", location: "Thirdwave Coffee", type: "Proximity" },
    { id: 2, name: "Priya Singh", time: "Saturday, 6:00 PM", location: "Forum Mall", type: "Availability" },
  ];

  const userActivity = {
    interested: [
      { id: 1, title: "Coffee & Code", location: "Thirdwave Coffee", date: "2024-01-15", type: "meetup" },
      { id: 2, title: "Design Critique Session", location: "Creative Hub", date: "2024-01-16", type: "meetup" },
    ],
    scheduled: [
      { id: 1, name: "Sarah Chen", time: "Today, 4:00 PM", location: "Thirdwave Coffee", type: "Proximity", status: "confirmed" },
      { id: 2, name: "Priya Singh", time: "Saturday, 6:00 PM", location: "Forum Mall", type: "Availability", status: "confirmed" },
    ],
    requested: [
      { id: 1, name: "Alex Kumar", time: "Yesterday, 2:00 PM", location: "Tech Park", type: "Proximity", status: "pending" },
      { id: 2, name: "Maya Patel", time: "Jan 10, 3:00 PM", location: "Art Gallery", type: "Availability", status: "pending" },
    ],
    accepted: [
      { id: 1, name: "David Kim", time: "Jan 8, 5:00 PM", location: "Startup Hub", type: "Proximity", status: "accepted" },
    ],
    past: [
      { id: 1, name: "James Wilson", time: "Jan 5, 7:00 PM", location: "Restaurant", type: "Availability", status: "completed", rating: 5 },
      { id: 2, name: "Lisa Chen", time: "Jan 3, 6:00 PM", location: "Coffee Shop", type: "Proximity", status: "completed", rating: 4 },
    ],
  };

  const getActivityCount = () => {
    return {
      interested: userActivity.interested.length,
      scheduled: userActivity.scheduled.length,
      requested: userActivity.requested.length,
      accepted: userActivity.accepted.length,
      past: userActivity.past.length,
      total: userActivity.interested.length + userActivity.scheduled.length + userActivity.requested.length + userActivity.accepted.length + userActivity.past.length
    };
  };

  const getFilteredActivities = () => {
    if (activeTab === 'all') {
      return [
        ...userActivity.interested.map(item => ({ ...item, category: 'interested' })),
        ...userActivity.scheduled.map(item => ({ ...item, category: 'scheduled' })),
        ...userActivity.requested.map(item => ({ ...item, category: 'requested' })),
        ...userActivity.accepted.map(item => ({ ...item, category: 'accepted' })),
        ...userActivity.past.map(item => ({ ...item, category: 'past' }))
      ];
    }
    return userActivity[activeTab].map(item => ({ ...item, category: activeTab }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerSection}>
        <View style={styles.header}>
          <Animated.Text style={[
            styles.headerTitle, 
            {
              transform: [{ translateX: titleTranslateX }],
              opacity: scrollY.interpolate({
                inputRange: [0, HEADER_SCROLL_DISTANCE * 0.5, HEADER_SCROLL_DISTANCE],
                outputRange: [1, 0.5, 0],
                extrapolate: 'clamp',
              }),
            }
          ]}>Profile</Animated.Text>
          <Pressable style={styles.editButton} onPress={() => navigation.navigate('Settings' as never)}>
            <Edit size={16} color="#7856d4" />
            <Text style={styles.editButtonText}>Edit</Text>
          </Pressable>
        </View>
        
        <View style={styles.profileImageContainer}>
          <Animated.View 
            style={[
              styles.profileImageWrapper,
              {
                transform: [
                  { translateX: headerImageTranslateX },
                  { translateY: headerImageTranslateY },
                  { scale: headerImageScale },
                ],
                opacity: mainImageOpacity,
              },
            ]}
          >
            <Image source={{ uri: userProfile.image }} style={styles.profileImage} />
            <Animated.View style={[styles.verifiedBadge, { opacity: headerImageScale }]}>
              <Text style={styles.verifiedText}>✓</Text>
            </Animated.View>
          </Animated.View>
        </View>
        
        {/* Header profile image when scrolled */}
        <Animated.View style={[styles.headerProfileImage, { opacity: headerOpacity }]}>
          <Animated.Image 
            source={{ uri: userProfile.image }} 
            style={[
              styles.headerProfileImageSmall,
              {
                transform: [{ scale: headerImageScale }],
              },
            ]} 
          />
          <Animated.View style={[styles.headerVerifiedBadge, { opacity: headerOpacity }]}>
            <Text style={styles.headerVerifiedText}>✓</Text>
          </Animated.View>
        </Animated.View>
        
        {/* Header profile details when scrolled - Name, Age, Gender (Main/Middle) */}
        <Animated.View style={[styles.headerProfileDetails, { opacity: headerOpacity }]}>
          <Animated.Text 
            style={[
              styles.headerProfileName,
              {
                transform: [{ translateX: headerOpacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                  extrapolate: 'clamp',
                }) }]
              }
            ]}
          >
            {userProfile.name}
          </Animated.Text>
          <Animated.View 
            style={[
              styles.headerProfileMeta,
              {
                opacity: headerOpacity.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, 0.5, 1],
                  extrapolate: 'clamp',
                }),
                transform: [{ translateX: headerOpacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                  extrapolate: 'clamp',
                }) }]
              }
            ]}
          >
            <Text style={styles.headerAgeText}>{userProfile.age} years old</Text>
            <Text style={styles.headerSeparator}>•</Text>
            <Text style={styles.headerGenderText}>{userProfile.gender}</Text>
          </Animated.View>
        </Animated.View>

        {/* Header footer - Location and Rating (Bottom of Banner) */}
        <Animated.View style={[styles.headerProfileFooter, { opacity: headerOpacity }]}>
          <Animated.View 
            style={[
              styles.headerLocationRow,
              {
                opacity: headerOpacity.interpolate({
                  inputRange: [0, 0.6, 1],
                  outputRange: [0, 0.5, 1],
                  extrapolate: 'clamp',
                }),
                transform: [{ translateX: headerOpacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                  extrapolate: 'clamp',
                }) }]
              }
            ]}
          >
            <MapPin size={15} color="#9CA3AF" />
            <Text style={styles.headerLocationText}>{userProfile.locality}</Text>
          </Animated.View>
          <Animated.View 
            style={[
              styles.headerRatingRow,
              {
                opacity: headerOpacity.interpolate({
                  inputRange: [0, 0.7, 1],
                  outputRange: [0, 0.5, 1],
                  extrapolate: 'clamp',
                }),
                transform: [{ translateX: headerOpacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                  extrapolate: 'clamp',
                }) }]
              }
            ]}
          >
            <Star size={15} color="#fbbf24" fill="#fbbf24" />
            <Text style={styles.headerRatingText}>{userProfile.trustScore}</Text>
            <Text style={styles.headerRatingsCount}>({userProfile.totalRatings} ratings)</Text>
          </Animated.View>
        </Animated.View>
      </View>

      <Animated.ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.contentContainer}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{userProfile.name}</Text>
          <View style={styles.profileDetails}>
            <Text style={styles.ageText}>{userProfile.age} years old</Text>
            <Text style={styles.separator}>•</Text>
            <Text style={styles.genderText}>{userProfile.gender}</Text>
          </View>
          <View style={styles.locationRow}>
            <MapPin size={16} color="#9CA3AF" />
            <Text style={styles.locationText}>{userProfile.locality}</Text>
          </View>

          <View style={styles.trustScoreRow}>
            <Star size={20} color="#fbbf24" fill="#fbbf24" />
            <Text style={styles.trustScore}>{userProfile.trustScore}</Text>
            <Text style={styles.ratingsText}>({userProfile.totalRatings} ratings)</Text>
          </View>

          <View style={styles.socialLinks}>
            <Pressable style={styles.socialButton}>
              <Instagram size={16} color="#E5E7EB" />
              <Text style={styles.socialButtonText}>Instagram</Text>
            </Pressable>
            <Pressable style={styles.socialButton}>
              <Linkedin size={16} color="#E5E7EB" />
              <Text style={styles.socialButtonText}>LinkedIn</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Interests</Text>
          <View style={styles.interestsContainer}>
            {userProfile.interests.map((interest) => (
              <View key={interest} style={styles.interestBadge}>
                <Text style={styles.interestBadgeText}>{interest}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Connection Preferences</Text>
          <View style={styles.interestsContainer}>
            {userProfile.preferences.map((pref) => (
              <View key={pref} style={styles.preferenceBadge}>
                <Text style={styles.preferenceBadgeText}>{pref}</Text>
              </View>
            ))}
          </View>
        </View>

        <Pressable style={styles.activitySection} onPress={() => setShowActivityModal(true)}>
          <View style={styles.activityHeader}>
            <Users size={18} color="#7856d4" />
            <Text style={styles.activityTitle}>Your Activity</Text>
            <ArrowRight size={16} color="#9CA3AF" />
          </View>
          
          <View style={styles.activityGrid}>
            <View style={styles.activityItem}>
              <View style={styles.activityItemHeader}>
                <Heart size={14} color="#9333ea" />
                <Text style={styles.activityItemLabel}>Interested</Text>
              </View>
              <Text style={styles.activityItemCount}>{getActivityCount().interested}</Text>
            </View>
            <View style={styles.activityItem}>
              <View style={styles.activityItemHeader}>
                <Calendar size={14} color="#2563eb" />
                <Text style={styles.activityItemLabel}>Scheduled</Text>
              </View>
              <Text style={styles.activityItemCount}>{getActivityCount().scheduled}</Text>
            </View>
            <View style={styles.activityItem}>
              <View style={styles.activityItemHeader}>
                <Clock size={14} color="#eab308" />
                <Text style={styles.activityItemLabel}>Requested</Text>
              </View>
              <Text style={styles.activityItemCount}>{getActivityCount().requested}</Text>
            </View>
            <View style={styles.activityItem}>
              <View style={styles.activityItemHeader}>
                <Users size={14} color="#6b7280" />
                <Text style={styles.activityItemLabel}>Past Events</Text>
              </View>
              <Text style={styles.activityItemCount}>{getActivityCount().past}</Text>
            </View>
          </View>
        </Pressable>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Calendar size={18} color="#7856d4" />
            <Text style={styles.sectionTitle}>Upcoming Meetups</Text>
          </View>
          {upcomingMeetups.length === 0 ? (
            <Text style={styles.emptyText}>No upcoming meetups</Text>
          ) : (
            <View style={styles.meetupsList}>
              {upcomingMeetups.map((meetup) => (
                <View key={meetup.id} style={styles.meetupRow}>
                  <View style={styles.meetupInfo}>
                    <Text style={styles.meetupName}>{meetup.name}</Text>
                    <Text style={styles.meetupTime}>{meetup.time}</Text>
                    <Text style={styles.meetupLocation}>{meetup.location}</Text>
                  </View>
                  <View style={[styles.meetupBadge, meetup.type === "Proximity" ? styles.badgeProx : styles.badgeAvail]}>
                    <Text style={styles.meetupBadgeText}>{meetup.type}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.actionsContainer}>
          <Pressable style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Edit Availability Slots</Text>
          </Pressable>
          <Pressable style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Verification Status</Text>
          </Pressable>
          <Pressable style={styles.signOutButton} onPress={() => {}}>
            <LogOut size={16} color="#dc2626" />
            <Text style={styles.signOutText}>Sign Out</Text>
          </Pressable>
        </View>
      </Animated.ScrollView>

      {/* Activity Modal */}
      <Modal visible={showActivityModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Your Activity</Text>
              <Pressable onPress={() => setShowActivityModal(false)}>
                <X size={20} color="#E5E7EB" />
              </Pressable>
            </View>

            <View style={styles.modalTabs}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.modalTabsContent}>
              {[
                { key: 'all', label: 'All', count: getActivityCount().total },
                { key: 'interested', label: 'Interested', count: getActivityCount().interested },
                { key: 'scheduled', label: 'Scheduled', count: getActivityCount().scheduled },
                { key: 'requested', label: 'Requested', count: getActivityCount().requested },
                { key: 'accepted', label: 'Accepted', count: getActivityCount().accepted },
                { key: 'past', label: 'Past Events', count: getActivityCount().past }
              ].map((tab) => (
                <Pressable
                  key={tab.key}
                  onPress={() => setActiveTab(tab.key as any)}
                  style={[styles.modalTab, activeTab === tab.key && styles.modalTabActive]}
                >
                  <Text style={[styles.modalTabText, activeTab === tab.key && styles.modalTabTextActive]}>
                    {tab.label} ({tab.count})
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
            </View>

            <ScrollView style={styles.modalList} showsVerticalScrollIndicator={false}>
              {getFilteredActivities().length === 0 ? (
                <View style={styles.emptyModal}>
                  <Users size={48} color="#9CA3AF" />
                  <Text style={styles.emptyModalText}>No activities found</Text>
                </View>
              ) : (
                <View style={styles.activitiesList}>
                  {getFilteredActivities().map((activity, index) => (
                    <View key={`${activity.category}-${activity.id}-${index}`} style={styles.activityCard}>
                      <View style={styles.activityCardLeft}>
                        <View style={[
                          styles.activityIconContainer,
                          activity.category === 'interested' && styles.iconPurple,
                          activity.category === 'scheduled' && styles.iconBlue,
                          activity.category === 'requested' && styles.iconYellow,
                          activity.category === 'accepted' && styles.iconGreen,
                          activity.category === 'past' && styles.iconGray,
                        ]}>
                          {activity.category === 'interested' ? <Heart size={16} color={activity.category === 'interested' ? '#9333ea' : '#fff'} /> :
                           activity.category === 'scheduled' ? <Calendar size={16} color={activity.category === 'scheduled' ? '#2563eb' : '#fff'} /> :
                           activity.category === 'requested' ? <Clock size={16} color={activity.category === 'requested' ? '#eab308' : '#fff'} /> :
                           activity.category === 'accepted' ? <CheckCircle size={16} color={activity.category === 'accepted' ? '#16a34a' : '#fff'} /> :
                           <Users size={16} color={activity.category === 'past' ? '#6b7280' : '#fff'} />}
                        </View>
                        <View style={styles.activityCardDetails}>
                          <Text style={styles.activityCardTitle}>{activity.title || activity.name}</Text>
                          <Text style={styles.activityCardTime}>{activity.time || activity.date}</Text>
                          <Text style={styles.activityCardLocation}>{activity.location}</Text>
                          {activity.rating && (
                            <View style={styles.activityRating}>
                              <Star size={12} color="#fbbf24" fill="#fbbf24" />
                              <Text style={styles.activityRatingText}>{activity.rating}/5</Text>
                            </View>
                          )}
                        </View>
                      </View>
                      <ArrowRight size={16} color="#9CA3AF" />
                    </View>
                  ))}
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  headerSection: { 
    backgroundColor: 'rgba(120, 86, 212, 0.2)', 
    paddingBottom: 70, 
    borderBottomLeftRadius: 32, 
    borderBottomRightRadius: 32,
    position: 'relative',
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start', 
    paddingHorizontal: 20, 
    paddingTop: 46, 
    paddingBottom: 12,
    minHeight: 150,
    position: 'relative',
    zIndex: 1,
  },
  headerTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#FFFFFF',
  },
  headerProfileImage: {
    position: 'absolute',
    left: 20,
    top: 36,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerProfileImageSmall: {
    width: 128,
    height: 128,
    borderRadius: 28,
    borderWidth: 4,
    borderColor: '#000000',
  },
  headerVerifiedBadge: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    width: 44,
    height: 44,
    backgroundColor: '#ff3f41',
    borderRadius: 22,
    borderWidth: 4,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerVerifiedText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 20 
  },
  headerProfileDetails: {
    position: 'absolute',
    left: 150,
    top: 38,
    zIndex: 2,
    flex: 1,
    paddingRight: 80,
    right: 16,
  },
  headerProfileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
    letterSpacing: -0.3,
    lineHeight: 24,
  },
  headerProfileMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  headerAgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ff3f41',
    lineHeight: 18,
  },
  headerSeparator: {
    color: '#9CA3AF',
    fontSize: 12,
    lineHeight: 18,
  },
  headerGenderText: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 18,
  },
  headerProfileFooter: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 16,
    zIndex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  headerLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
    flex: 1,
  },
  headerLocationText: {
    fontSize: 13,
    color: '#E5E7EB',
    flexShrink: 1,
    lineHeight: 18,
    fontWeight: '500',
  },
  headerRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  headerRatingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: 18,
  },
  headerRatingsCount: {
    fontSize: 12,
    color: '#9CA3AF',
    lineHeight: 16,
  },
  editButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8, 
    paddingHorizontal: 16, 
    paddingVertical: 8, 
    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
    borderRadius: 24, 
    borderWidth: 1, 
    borderColor: 'rgba(46, 46, 46, 0.5)' 
  },
  editButtonText: { fontSize: 14, fontWeight: '600', color: '#7856d4' },
  profileImageContainer: { 
    alignItems: 'center', 
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -60,
    zIndex: 10,
  },
  profileImageWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: { 
    width: 140, 
    height: 140, 
    borderRadius: 28, 
    borderWidth: 4, 
    borderColor: '#000000',
  },
  verifiedBadge: { 
    position: 'absolute', 
    bottom: -8, 
    right: -8, 
    width: 44, 
    height: 44, 
    backgroundColor: '#ff3f41', 
    borderRadius: 22, 
    borderWidth: 4, 
    borderColor: '#000000', 
    alignItems: 'center', 
    justifyContent: 'center',
    shadowColor: '#ff3f41',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  verifiedText: { color: '#fff', fontWeight: 'bold', fontSize: 20 },
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 80, paddingBottom: 24 },
  contentContainer: {
    paddingBottom: 100, // Adjust paddingBottom for the ScrollView content
  },
  profileInfo: { alignItems: 'center', marginBottom: 24 },
  profileName: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 4 },
  profileDetails: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  ageText: { fontSize: 18, fontWeight: '600', color: '#ff3f41' },
  separator: { color: '#9CA3AF', fontSize: 14 },
  genderText: { fontSize: 14, color: '#9CA3AF' },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  locationText: { fontSize: 14, color: '#9CA3AF' },
  trustScoreRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  trustScore: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' },
  ratingsText: { fontSize: 14, color: '#9CA3AF' },
  socialLinks: { flexDirection: 'row', gap: 12 },
  socialButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8, 
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    backgroundColor: 'rgba(26, 26, 26, 0.5)', 
    borderRadius: 24, 
    borderWidth: 1, 
    borderColor: 'rgba(46, 46, 46, 0.5)' 
  },
  socialButtonText: { fontSize: 14, fontWeight: '600', color: '#E5E7EB' },
  section: { 
    marginBottom: 24, 
    backgroundColor: '#0D0D0D', 
    borderRadius: 24, 
    padding: 20, 
    borderWidth: 1, 
    borderColor: 'rgba(46, 46, 46, 0.5)' 
  },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' },
  interestsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  interestBadge: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: 'rgba(120, 86, 212, 0.1)', borderRadius: 20 },
  interestBadgeText: { fontSize: 14, color: '#7856d4', fontWeight: '600' },
  preferenceBadge: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: 'rgba(26, 26, 26, 0.5)', borderRadius: 20, borderWidth: 1, borderColor: 'rgba(46, 46, 46, 0.5)' },
  preferenceBadgeText: { fontSize: 14, color: '#E5E7EB', fontWeight: '600' },
  activitySection: { 
    marginBottom: 24, 
    backgroundColor: '#0D0D0D', 
    borderRadius: 24, 
    padding: 20, 
    borderWidth: 1, 
    borderColor: 'rgba(46, 46, 46, 0.5)' 
  },
  activityHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  activityTitle: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF', flex: 1 },
  activityGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  activityItem: { 
    flex: 1, 
    minWidth: '45%', 
    backgroundColor: 'rgba(26, 26, 26, 0.4)', 
    borderRadius: 16, 
    padding: 12 
  },
  activityItemHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  activityItemLabel: { fontSize: 12, fontWeight: '600', color: '#9CA3AF' },
  activityItemCount: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' },
  meetupsList: { gap: 12 },
  meetupRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: 16, 
    backgroundColor: 'rgba(26, 26, 26, 0.4)', 
    borderRadius: 20, 
    borderWidth: 1, 
    borderColor: 'rgba(46, 46, 46, 0.3)' 
  },
  meetupInfo: { flex: 1 },
  meetupName: { fontSize: 14, fontWeight: '600', marginBottom: 4, color: '#FFFFFF' },
  meetupTime: { fontSize: 12, color: '#9CA3AF', marginBottom: 2 },
  meetupLocation: { fontSize: 12, color: '#9CA3AF' },
  meetupBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  badgeProx: { backgroundColor: '#ff3f41' },
  badgeAvail: { backgroundColor: '#7856d4' },
  meetupBadgeText: { fontSize: 10, color: '#fff', fontWeight: 'bold' },
  actionsContainer: { gap: 12, marginBottom: 24 },
  actionButton: { 
    paddingVertical: 14, 
    backgroundColor: 'rgba(26, 26, 26, 0.5)', 
    borderWidth: 1, 
    borderColor: 'rgba(46, 46, 46, 0.5)', 
    borderRadius: 20, 
    alignItems: 'center' 
  },
  actionButtonText: { fontSize: 14, fontWeight: '600', color: '#E5E7EB' },
  signOutButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 8, 
    paddingVertical: 14, 
    backgroundColor: 'rgba(220, 38, 38, 0.1)', 
    borderWidth: 1, 
    borderColor: 'rgba(220, 38, 38, 0.2)', 
    borderRadius: 20 
  },
  signOutText: { color: '#dc2626', fontWeight: '600', fontSize: 14 },
  emptyText: { textAlign: 'center', color: '#9CA3AF', fontSize: 14, paddingVertical: 24 },
  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' },
  modalContent: { 
    backgroundColor: '#000000', 
    borderTopLeftRadius: 24, 
    borderTopRightRadius: 24, 
    maxHeight: '85%',
    borderWidth: 1,
    borderColor: '#1A1A1A',
  },
  modalHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 20, 
    borderBottomWidth: 1, 
    borderBottomColor: '#1A1A1A' 
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' },
  modalTabs: { 
    paddingVertical: 20, 
    borderBottomWidth: 1, 
    borderBottomColor: '#1A1A1A' 
  },
  modalTabsContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  modalTab: { 
    paddingHorizontal: 12, 
    paddingVertical: 8, 
    borderRadius: 20, 
    backgroundColor: 'rgba(26, 26, 26, 0.5)', 
    marginRight: 8 
  },
  modalTabActive: { backgroundColor: '#7856d4' },
  modalTabText: { fontSize: 14, fontWeight: '600', color: '#9CA3AF' },
  modalTabTextActive: { color: '#FFFFFF' },
  modalList: { flex: 1 },
  emptyModal: { alignItems: 'center', justifyContent: 'center', paddingVertical: 48 },
  emptyModalText: { color: '#9CA3AF', fontSize: 14, marginTop: 16 },
  activitiesList: { padding: 20, gap: 12 },
  activityCard: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: 16, 
    backgroundColor: 'rgba(26, 26, 26, 0.4)', 
    borderRadius: 20 
  },
  activityCardLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  activityIconContainer: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  iconPurple: { backgroundColor: 'rgba(147, 51, 234, 0.2)' },
  iconBlue: { backgroundColor: 'rgba(37, 99, 235, 0.2)' },
  iconYellow: { backgroundColor: 'rgba(234, 179, 8, 0.2)' },
  iconGreen: { backgroundColor: 'rgba(22, 163, 74, 0.2)' },
  iconGray: { backgroundColor: 'rgba(107, 114, 128, 0.2)' },
  activityCardDetails: { flex: 1 },
  activityCardTitle: { fontSize: 14, fontWeight: '600', color: '#FFFFFF', marginBottom: 4 },
  activityCardTime: { fontSize: 12, color: '#9CA3AF', marginBottom: 2 },
  activityCardLocation: { fontSize: 12, color: '#9CA3AF' },
  activityRating: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  activityRatingText: { fontSize: 12, color: '#9CA3AF' },
});

export default ProfileScreen;
