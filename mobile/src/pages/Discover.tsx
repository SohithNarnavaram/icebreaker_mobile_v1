import React, { useState } from "react";
import { View, Text, SafeAreaView, ScrollView, Pressable, Image, StyleSheet, TextInput } from "react-native";
import { Heart, Users, MapPin, Calendar, Star, MessageCircle, Search } from "lucide-react-native";

const DiscoverScreen = () => {
  const featuredPeople = [
    { id: 1, name: "Sarah Chen", tag: "Designer • 0.5km away", interests: ["Design", "Coffee"], color: "#ec4899" },
    { id: 2, name: "Alex Kumar", tag: "Developer • 1.2km away", interests: ["Tech", "Gaming"], color: "#06b6d4" },
    { id: 3, name: "Maya Patel", tag: "Musician • 2.1km away", interests: ["Music", "Art"], color: "#8b5cf6" },
    { id: 4, name: "David Kim", tag: "Entrepreneur • 0.8km away", interests: ["Startup", "Networking"], color: "#10b981" },
    { id: 5, name: "Priya Singh", tag: "Fitness Coach • 1.5km away", interests: ["Fitness", "Health"], color: "#f97316" },
    { id: 6, name: "James Wilson", tag: "Chef • 2.3km away", interests: ["Food", "Cooking"], color: "#f59e0b" },
  ];

  const categories = ["Nearby", "Tech", "Design", "Music", "Fitness", "Food"];

  const [likedMeetups, setLikedMeetups] = useState<Set<number>>(new Set());
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const trendingMeetups = [
    { id: 1, title: "Coffee & Code", location: "Thirdwave Coffee", time: "Today, 4:00 PM", attendees: 8 },
    { id: 2, title: "Design Critique Session", location: "Creative Hub", time: "Tomorrow, 6:00 PM", attendees: 12 },
  ];

  const handleToggleInterested = (id: number) => {
    setLikedMeetups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Discover</Text>
          <Pressable style={styles.searchButton} onPress={() => {
            setShowSearchBar((v) => !v);
            if (showSearchBar) setSearchQuery("");
          }}>
            <Search size={18} color="#E5E7EB" />
          </Pressable>
        </View>
        <Text style={styles.subtitle}>Find amazing people around you</Text>
        {showSearchBar && (
          <View style={styles.searchBarWrapper}>
            <Search size={18} color="#9CA3AF" style={styles.searchIcon} />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search people, interests, or locations..."
              placeholderTextColor="#9CA3AF"
              style={styles.searchInput}
            />
          </View>
        )}
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.featuredCard}>
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredBadgeText}>Featured • Verified</Text>
          </View>
          <Text style={styles.featuredName}>Sarah Chen</Text>
          <Text style={styles.featuredTag}>UI/UX Designer • 0.5km away</Text>
          <View style={styles.featuredInterests}>
            <Text style={styles.featuredInterest}>Design</Text>
            <Text style={styles.featuredInterest}>Coffee</Text>
          </View>
          <View style={styles.featuredDecor} />
        </View>

        <Text style={styles.sectionTitle}>Explore by Interest</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          {categories.map((category) => (
            <Pressable key={category} style={styles.categoryButton}>
              <Text style={styles.categoryText}>{category}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>People Nearby</Text>
        <View style={styles.peopleGrid}>
          {featuredPeople.map((person) => (
            <View key={person.id} style={[styles.personCard, { backgroundColor: person.color }]}>
              <Text style={styles.personTag}>{person.tag}</Text>
              <Text style={styles.personName}>{person.name}</Text>
              <View style={styles.personInterests}>
                {person.interests.map((interest) => (
                  <View key={interest} style={styles.personInterestTag}>
                    <Text style={styles.personInterestText}>{interest}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Trending Meetups</Text>
        {trendingMeetups.map((meetup) => (
          <View key={meetup.id} style={styles.meetupCard}>
            <View style={styles.meetupHeader}>
              <View style={styles.meetupHeaderLeft}>
                <Text style={styles.meetupTitle}>{meetup.title}</Text>
                <View style={styles.meetupRow}>
                  <MapPin size={14} color="#9CA3AF" />
                  <Text style={styles.meetupText}>{meetup.location}</Text>
                </View>
                <View style={styles.meetupRow}>
                  <Calendar size={14} color="#9CA3AF" />
                  <Text style={styles.meetupText}>{meetup.time}</Text>
                </View>
              </View>
              <View style={styles.meetupAttendees}>
                <Users size={14} color="#9CA3AF" />
                <Text style={styles.meetupAttendeesText}>{meetup.attendees}</Text>
              </View>
            </View>
            <View style={styles.meetupActions}>
              <Pressable 
                onPress={() => handleToggleInterested(meetup.id)}
                style={[
                  styles.interestButton,
                  likedMeetups.has(meetup.id) && { borderColor: '#ff3f41', backgroundColor: '#FFE7E8' }
                ]}
              >
                <Heart size={16} color={likedMeetups.has(meetup.id) ? '#ff3f41' : '#E5E7EB'} fill={likedMeetups.has(meetup.id) ? '#ff3f41' : 'none'} />
                <Text style={[styles.interestButtonText, likedMeetups.has(meetup.id) && { color: '#ff3f41' }]}>Interested</Text>
              </Pressable>
              <Pressable style={styles.joinButton}>
                <MessageCircle size={16} color="#fff" />
                <Text style={styles.joinButtonText}>Join</Text>
              </Pressable>
            </View>
          </View>
        ))}

        {/* Start Connecting Card */}
        <View style={styles.startConnectingCard}>
          <View style={styles.startConnectingLeft}>
            <View style={styles.startConnectingIcon}>
              <Star size={18} color="#FFFFFF" fill="#FFFFFF" />
            </View>
            <View style={styles.startConnectingTextContainer}>
              <Text style={styles.startConnectingTitle}>Start Connecting</Text>
              <Text style={styles.startConnectingSubtitle}>Turn on Connect Mode</Text>
            </View>
          </View>
          <Pressable style={styles.startConnectingButton}>
            <Users size={16} color="#FFFFFF" />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  header: { paddingHorizontal: 24, paddingTop: 46, paddingBottom: 20, backgroundColor: '#000000' },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#E5E7EB' },
  subtitle: { fontSize: 14, color: '#9CA3AF' },
  searchButton: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#0F0F10', borderWidth: 1, borderColor: '#2E2E2E', alignItems: 'center', justifyContent: 'center' },
  searchBarWrapper: { position: 'relative', marginTop: 12 },
  searchIcon: { position: 'absolute', left: 14, top: 14 },
  searchInput: { height: 48, borderRadius: 24, backgroundColor: '#0F0F10', borderWidth: 1, borderColor: '#2E2E2E', paddingLeft: 44, paddingRight: 16, color: '#E5E7EB' },
  content: { flex: 1, padding: 16 },
  featuredCard: { padding: 16, backgroundColor: '#7856d4', borderRadius: 16, marginBottom: 24, position: 'relative', overflow: 'hidden' },
  featuredDecor: { position: 'absolute', right: -24, bottom: -24, width: 120, height: 120, backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 60 },
  featuredBadge: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, alignSelf: 'flex-start', marginBottom: 8 },
  featuredBadgeText: { fontSize: 11, color: '#fff', fontWeight: 'bold' },
  featuredName: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  featuredTag: { fontSize: 14, color: 'rgba(255,255,255,0.9)', marginBottom: 12 },
  featuredInterests: { flexDirection: 'row', gap: 8 },
  featuredInterest: { paddingHorizontal: 8, paddingVertical: 4, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12, fontSize: 12, color: '#fff' },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12, paddingLeft: 4, color: '#FFFFFF' },
  categoriesContainer: { marginBottom: 24 },
  categoryButton: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: '#0F0F10', borderWidth: 1, borderColor: '#2E2E2E', borderRadius: 24, marginRight: 8 },
  categoryText: { fontSize: 14, color: '#E5E7EB' },
  peopleGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  personCard: { width: '47%', padding: 12, borderRadius: 16, marginBottom: 0 },
  personTag: { fontSize: 11, color: 'rgba(255,255,255,0.8)', marginBottom: 4 },
  personName: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  personInterests: { flexDirection: 'row', gap: 4 },
  personInterestTag: { paddingHorizontal: 8, paddingVertical: 4, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12 },
  personInterestText: { fontSize: 12, color: '#fff' },
  meetupCard: { padding: 16, backgroundColor: '#0F0F10', borderRadius: 16, borderWidth: 1, borderColor: '#2E2E2E', marginBottom: 12 },
  meetupHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 },
  meetupHeaderLeft: { flex: 1 },
  meetupTitle: { fontSize: 16, fontWeight: '600', color: '#E5E7EB', marginBottom: 4 },
  meetupRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 },
  meetupText: { fontSize: 14, color: '#9CA3AF' },
  meetupAttendees: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  meetupAttendeesText: { fontSize: 14, color: '#E5E7EB' },
  meetupActions: { flexDirection: 'row', gap: 8, marginTop: 4 },
  interestButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 8, borderWidth: 1, borderColor: '#2E2E2E', borderRadius: 12, backgroundColor: '#000000' },
  interestButtonText: { fontSize: 14, color: '#E5E7EB', fontWeight: '600' },
  joinButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 8, backgroundColor: '#ff3f41', borderRadius: 12 },
  joinButtonText: { fontSize: 14, color: '#fff', fontWeight: '600' },
  startConnectingCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#0F0F10', borderRadius: 16, borderWidth: 1, borderColor: '#2E2E2E', padding: 16, marginTop: 12 },
  startConnectingLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  startConnectingIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255, 63, 65, 0.5)', alignItems: 'center', justifyContent: 'center' },
  startConnectingTextContainer: { flex: 1 },
  startConnectingTitle: { fontSize: 14, fontWeight: '600', color: '#E5E7EB', marginBottom: 2 },
  startConnectingSubtitle: { fontSize: 12, color: '#9CA3AF' },
  startConnectingButton: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#ff3f41', alignItems: 'center', justifyContent: 'center' },
});

export default DiscoverScreen;
