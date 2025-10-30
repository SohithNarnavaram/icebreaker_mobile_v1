import React, { useState } from "react";
import { View, Text, SafeAreaView, ScrollView, Image, Pressable, StyleSheet } from "react-native";
import { Clock, MapPin, Check, X, Bell, Calendar } from "lucide-react-native";
import { useNotifications } from "../contexts/NotificationContext";

const RequestsScreen = () => {
  const { updatePendingRequests } = useNotifications();
  const [activeTab, setActiveTab] = useState<"proximity" | "availability">("proximity");
  
  const [proximityRequests, setProximityRequests] = useState([
    {
      id: 1,
      name: "Maya Patel",
      age: 25,
      time: "5 minutes ago",
      message: "Hi! I noticed we're both into art and music. Want to grab coffee?",
      interests: ["Art", "Music"],
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Rohit Sharma",
      age: 29,
      time: "1 hour ago",
      message: "Hey there! Love your book collection. Coffee sometime?",
      interests: ["Books", "Travel"],
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    },
  ]);

  const [availabilityRequests, setAvailabilityRequests] = useState([
    {
      id: 1,
      name: "Kavya Reddy",
      age: 26,
      time: "2 hours ago",
      slot: { time: "Today, 7:00 PM", location: "Cafe Coffee Day, Indiranagar" },
      interests: ["Startup", "Networking"],
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
  ]);

  const handleProximityResponse = (requestId: number, accepted: boolean, userName: string) => {
    setProximityRequests(prev => prev.filter(req => req.id !== requestId));
    updatePendingRequests(proximityRequests.length - 1 + availabilityRequests.length);
    console.log(accepted ? `Accepted ${userName}` : `Declined ${userName}`);
  };

  const handleAvailabilityResponse = (requestId: number, accepted: boolean, userName: string) => {
    setAvailabilityRequests(prev => prev.filter(req => req.id !== requestId));
    updatePendingRequests(proximityRequests.length + availabilityRequests.length - 1);
    console.log(accepted ? `Confirmed ${userName}` : `Declined ${userName}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Requests</Text>
        <Text style={styles.subtitle}>Manage connections</Text>
      </View>

      <View style={styles.tabContainer}>
        <Pressable
          style={[styles.tab, activeTab === "proximity" && styles.tabActive]}
          onPress={() => setActiveTab("proximity")}
        >
          <Text style={[styles.tabText, activeTab === "proximity" && styles.tabTextActive]}>
            Nearby ({proximityRequests.length})
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === "availability" && styles.tabActive]}
          onPress={() => setActiveTab("availability")}
        >
          <Text style={[styles.tabText, activeTab === "availability" && styles.tabTextActive]}>
            Scheduled ({availabilityRequests.length})
          </Text>
        </Pressable>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === "proximity" ? (
          proximityRequests.length === 0 ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <Bell size={32} color="#9ca3af" />
              </View>
              <Text style={styles.emptyText}>No proximity requests</Text>
            </View>
          ) : (
            <View style={styles.requestsContainer}>
              {proximityRequests.map((request) => (
                <View key={request.id} style={styles.requestCard}>
                  <View style={styles.requestHeader}>
                    <Image source={{ uri: request.image }} style={styles.requestAvatar} />
                    <View style={styles.requestInfo}>
                      <View style={styles.requestNameRow}>
                        <Text style={styles.requestName}>{request.name}, {request.age}</Text>
                        <View style={styles.badgeProx}>
                          <Text style={styles.badgeText}>Nearby</Text>
                        </View>
                      </View>
                      <Text style={styles.requestTime}>{request.time}</Text>
                    </View>
                  </View>
                  
                  <Text style={styles.requestMessage}>{request.message}</Text>
                  
                  <View style={styles.interestsContainer}>
                    {request.interests.map((interest) => (
                      <View key={interest} style={styles.interestTag}>
                        <Text style={styles.interestText}>{interest}</Text>
                      </View>
                    ))}
                  </View>

                  <View style={styles.actionButtons}>
                    <Pressable
                      style={styles.declineButton}
                      onPress={() => handleProximityResponse(request.id, false, request.name)}
                    >
                      <X size={16} color="#E5E7EB" />
                      <Text style={styles.declineButtonText}>Decline</Text>
                    </Pressable>
                    <Pressable
                      style={styles.acceptButton}
                      onPress={() => handleProximityResponse(request.id, true, request.name)}
                    >
                      <Check size={16} color="#fff" />
                      <Text style={styles.acceptButtonText}>Accept</Text>
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          )
        ) : (
          availabilityRequests.length === 0 ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <Calendar size={32} color="#9ca3af" />
              </View>
              <Text style={styles.emptyText}>No availability requests</Text>
            </View>
          ) : (
            <View style={styles.requestsContainer}>
              {availabilityRequests.map((request) => (
                <View key={request.id} style={styles.requestCard}>
                  <View style={styles.requestHeader}>
                    <Image source={{ uri: request.image }} style={styles.requestAvatar} />
                    <View style={styles.requestInfo}>
                      <View style={styles.requestNameRow}>
                        <Text style={styles.requestName}>{request.name}, {request.age}</Text>
                        <View style={styles.badgeAvail}>
                          <Text style={styles.badgeText}>Scheduled</Text>
                        </View>
                      </View>
                      <Text style={styles.requestTime}>{request.time}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.slotCard}>
                    <View style={styles.slotRow}>
                      <Clock size={15} color="#9CA3AF" />
                      <Text style={styles.slotText}>{request.slot.time}</Text>
                    </View>
                    <View style={styles.slotRow}>
                      <MapPin size={15} color="#6b7280" />
                      <Text style={styles.slotTextMuted}>{request.slot.location}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.interestsContainer}>
                    {request.interests.map((interest) => (
                      <View key={interest} style={[styles.interestTag, styles.interestTagAvail]}>
                        <Text style={[styles.interestText, styles.interestTextAvail]}>{interest}</Text>
                      </View>
                    ))}
                  </View>

                  <View style={styles.actionButtons}>
                    <Pressable
                      style={styles.declineButton}
                      onPress={() => handleAvailabilityResponse(request.id, false, request.name)}
                    >
                      <X size={16} color="#E5E7EB" />
                      <Text style={styles.declineButtonText}>Decline</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.acceptButton, styles.confirmButton]}
                      onPress={() => handleAvailabilityResponse(request.id, true, request.name)}
                    >
                      <Check size={16} color="#fff" />
                      <Text style={styles.acceptButtonText}>Confirm</Text>
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  header: { paddingHorizontal: 20, paddingTop: 46, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#2E2E2E' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#E5E7EB', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#9CA3AF' },
  tabContainer: { 
    flexDirection: 'row', 
    marginHorizontal: 16, 
    marginTop: 16, 
    marginBottom: 20, 
    backgroundColor: '#1A1A1A', 
    borderRadius: 20, 
    padding: 4,
  },
  tab: { flex: 1, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 16 },
  tabActive: { 
    backgroundColor: '#000000', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 2, 
    elevation: 2 
  },
  tabText: { fontSize: 14, fontWeight: '600', color: '#9CA3AF', textAlign: 'center' },
  tabTextActive: { color: '#E5E7EB', fontWeight: '600' },
  content: { flex: 1, paddingHorizontal: 16, paddingBottom: 24 },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 48 },
  emptyIcon: { 
    width: 80, 
    height: 80, 
    backgroundColor: '#1A1A1A', 
    borderRadius: 40, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginBottom: 16,
  },
  emptyText: { fontSize: 16, color: '#9CA3AF', fontWeight: '600' },
  requestsContainer: { gap: 12, paddingBottom: 16 },
  requestCard: { 
    padding: 16, 
    backgroundColor: '#0D0D0D', 
    borderRadius: 24, 
    borderWidth: 1, 
    borderColor: '#2E2E2E',
  },
  requestHeader: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  requestAvatar: { 
    width: 56, 
    height: 56, 
    borderRadius: 16,
  },
  requestInfo: { flex: 1, minWidth: 0 },
  requestNameRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start', 
    marginBottom: 4,
    gap: 8,
  },
  requestName: { fontSize: 16, fontWeight: 'bold', color: '#E5E7EB', flex: 1 },
  badgeProx: { 
    backgroundColor: '#ff3f41', 
    paddingHorizontal: 8, 
    paddingVertical: 2, 
    borderRadius: 12,
    flexShrink: 0,
  },
  badgeAvail: { 
    backgroundColor: '#7856d4', 
    paddingHorizontal: 8, 
    paddingVertical: 2, 
    borderRadius: 12,
    flexShrink: 0,
  },
  badgeText: { fontSize: 10, color: '#FFFFFF', fontWeight: 'bold' },
  requestTime: { fontSize: 12, color: '#9CA3AF' },
  requestMessage: { 
    fontSize: 14, 
    color: '#E5E7EB', 
    marginBottom: 12, 
    lineHeight: 20,
  },
  interestsContainer: { flexDirection: 'row', gap: 6, marginBottom: 16, flexWrap: 'wrap' },
  interestTag: { 
    backgroundColor: 'rgba(120, 86, 212, 0.1)', 
    paddingHorizontal: 10, 
    paddingVertical: 4, 
    borderRadius: 12,
  },
  interestText: { fontSize: 12, color: '#7856d4', fontWeight: '600' },
  interestTagAvail: { 
    backgroundColor: 'rgba(120, 86, 212, 0.1)',
  },
  interestTextAvail: { color: '#7856d4' },
  actionButtons: { flexDirection: 'row', gap: 8 },
  declineButton: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 8, 
    paddingVertical: 10, 
    borderWidth: 2, 
    borderColor: '#2E2E2E', 
    borderRadius: 12,
    backgroundColor: '#000000',
  },
  declineButtonText: { color: '#E5E7EB', fontWeight: '600', fontSize: 14 },
  acceptButton: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 8, 
    paddingVertical: 10, 
    backgroundColor: '#ff3f41', 
    borderRadius: 12,
  },
  acceptButtonText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  confirmButton: { backgroundColor: '#7856d4' },
  slotCard: { 
    padding: 12, 
    backgroundColor: 'rgba(255, 255, 255, 0.03)', 
    borderRadius: 20, 
    marginBottom: 12, 
    gap: 8,
  },
  slotRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  slotText: { fontSize: 14, fontWeight: '600', color: '#E5E7EB' },
  slotTextMuted: { fontSize: 14, color: '#9CA3AF' },
});

export default RequestsScreen;
