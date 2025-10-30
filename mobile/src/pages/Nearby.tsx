import React, { useState } from "react";
import { 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  Image, 
  Pressable, 
  Switch,
  StyleSheet,
  Animated,
  TextInput,
  Modal
} from "react-native";
import { MapPin, Heart, MessageCircle, Map, List, Search } from "lucide-react-native";

const CustomToggle = ({ value, onValueChange }: { value: boolean; onValueChange: (val: boolean) => void }) => {
  return (
    <Pressable onPress={() => onValueChange(!value)} style={styles.customToggleContainer}>
      <View style={[
        styles.customToggle,
        { backgroundColor: value ? '#ff3f41' : '#000000' }
      ]}>
        <Animated.View
          style={[
            styles.customToggleThumb,
            {
              transform: [{ translateX: value ? 20 : 0 }]
            }
          ]}
        />
      </View>
    </Pressable>
  );
};

const NearbyScreen = () => {
  const [connectMode, setConnectMode] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [locationSearch, setLocationSearch] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('HSR Layout, Bangalore');
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [showDiscovery, setShowDiscovery] = useState(false);
  const [likedUsers, setLikedUsers] = useState<Set<number>>(new Set());
  const [requestedUsers, setRequestedUsers] = useState<Set<number>>(new Set());
  const [showToast, setShowToast] = useState(false);
  const [toastTitle, setToastTitle] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [userToCancel, setUserToCancel] = useState<{id: number, name: string} | null>(null);

  const locationSuggestions = [
    'HSR Layout, Bangalore',
    'Koramangala, Bangalore',
    'Indiranagar, Bangalore',
    'Whitefield, Bangalore',
    'Electronic City, Bangalore',
    'Marathahalli, Bangalore',
    'BTM Layout, Bangalore',
    'JP Nagar, Bangalore',
    'Bannerghatta Road, Bangalore',
    'Malleshwaram, Bangalore',
  ];

  const nearbyUsers = [
    {
      id: 1,
      name: "Sarah Chen",
      age: 24,
      distance: "0.5km away",
      interests: ["Coffee", "Books"],
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Alex Kumar",
      age: 27,
      distance: "1.2km away",
      interests: ["Fitness", "Travel"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    },
    {
      id: 3,
      name: "Maya Patel",
      age: 25,
      distance: "2.1km away",
      interests: ["Art", "Music"],
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    },
  ];

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setLocationSearch(location);
    setShowLocationSuggestions(false);
  };

  const filteredLocations = locationSuggestions.filter(location =>
    location.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const handleSearchFocus = () => {
    setShowLocationSuggestions(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => setShowLocationSuggestions(false), 200);
  };

  const handleLike = (userId: number, userName: string) => {
    setLikedUsers(prev => {
      const next = new Set(prev);
      if (next.has(userId)) {
        next.delete(userId);
      } else {
        next.add(userId);
      }
      return next;
    });
  };

  const handleConnect = (userId: number, userName: string) => {
    if (requestedUsers.has(userId)) {
      // Show cancel confirmation modal
      setUserToCancel({ id: userId, name: userName });
      setShowCancelModal(true);
    } else {
      console.log(`Connection request sent to ${userName}`);
      setRequestedUsers(prev => new Set(prev).add(userId));
      setToastTitle('Request sent!');
      setToastMessage(`Your meetup request has been sent to ${userName}`);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        setToastTitle('');
        setToastMessage('');
      }, 3000);
    }
  };

  const handleCancelRequest = () => {
    if (userToCancel) {
      setRequestedUsers(prev => {
        const next = new Set(prev);
        next.delete(userToCancel.id);
        return next;
      });
      setToastTitle('Request is cancelled!');
      setToastMessage(`The request is cancelled to ${userToCancel.name}`);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        setToastTitle('');
        setToastMessage('');
      }, 3000);
    }
    setShowCancelModal(false);
    setUserToCancel(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>Nearby People</Text>
            <View>
              <Text style={styles.subtitle}>Connect with people</Text>
              <Text style={styles.subtitle}>around you</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <Pressable style={styles.connectModeContainer} onPress={() => setConnectMode(!connectMode)}>
              <View>
                <Text style={styles.connectModeLabel}>Connect</Text>
                <Text style={styles.connectModeLabel}>Mode</Text>
              </View>
              <CustomToggle
                value={connectMode}
                onValueChange={(val) => {
                  setConnectMode(val);
                  if (val) {
                    setShowDiscovery(true);
                    setTimeout(() => setShowDiscovery(false), 3000);
                  } else {
                    setShowDiscovery(false);
                  }
                }}
              />
            </Pressable>
          </View>
        </View>
      </View>

      {showDiscovery && (
        <View style={styles.discoveryBannerWrapperAbsolute}>
          <View style={styles.discoveryBanner}>
            <View style={styles.discoveryDot} />
            <Text style={styles.discoveryText}>Discovering people nearby</Text>
          </View>
          <View style={styles.discoveryPointer} />
        </View>
      )}

      {showToast && (
        <View style={styles.toastContainer}>
          <View style={styles.toast}>
            <Text style={styles.toastTitle}>{toastTitle}</Text>
            <Text style={styles.toastMessage}>{toastMessage}</Text>
          </View>
        </View>
      )}

      {connectMode && (
        <View style={styles.viewToggle}>
          <Pressable
            style={[styles.toggleButton, viewMode === 'list' && styles.toggleButtonActive]}
            onPress={() => setViewMode('list')}
          >
            <List size={16} color="#fff" />
            <Text style={styles.toggleButtonText}>List</Text>
          </Pressable>
          <Pressable
            style={[styles.toggleButton, viewMode === 'map' && styles.toggleButtonActiveMap]}
            onPress={() => setViewMode('map')}
          >
            <Map size={16} color="#fff" />
            <Text style={styles.toggleButtonText}>Map</Text>
          </Pressable>
        </View>
      )}

      <ScrollView style={styles.content}>
        <View style={styles.locationCard}>
          <MapPin size={16} color="#ff3f41" />
          <Text style={styles.locationText}>{selectedLocation}</Text>
        </View>

        {!connectMode && (
          <View style={styles.enableCard}>
            <View style={styles.enableIcon}>
              <MapPin size={24} color="#fff" />
            </View>
            <Text style={styles.enableText}>
              Turn on Connect Mode to discover people nearby
            </Text>
            <Pressable
              style={styles.enableButton}
              onPress={() => setConnectMode(true)}
            >
              <Text style={styles.enableButtonText}>Enable Connect Mode</Text>
            </Pressable>
          </View>
        )}

        {connectMode && viewMode === 'map' && (
          <>
            <View style={styles.searchBarContainer}>
              <View style={styles.searchBar}>
                <Search size={18} color="#9CA3AF" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search location..."
                  placeholderTextColor="#9CA3AF"
                  value={locationSearch}
                  onChangeText={setLocationSearch}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                />
              </View>
              {showLocationSuggestions && filteredLocations.length > 0 && (
                <View style={styles.suggestionsContainer}>
                  {filteredLocations.map((location, index) => (
                    <Pressable
                      key={index}
                      style={styles.suggestionItem}
                      onPress={() => handleLocationSelect(location)}
                    >
                      <MapPin size={16} color="#9CA3AF" />
                      <Text style={styles.suggestionText}>{location}</Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
            <View style={styles.mapContainer}>
              <View style={styles.mapPlaceholder}>
                <Text style={styles.mapPlaceholderText}>Map View</Text>
                <Text style={styles.mapPlaceholderSubtext}>Map integration coming soon</Text>
              </View>
            </View>
          </>
        )}

        {connectMode && viewMode === 'list' && (
          <View style={styles.usersContainer}>
            {nearbyUsers.map((user) => (
              <View key={user.id} style={styles.userCard}>
                <Image source={{ uri: user.image }} style={styles.userImage} />
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{user.name}, {user.age}</Text>
                  <View style={styles.distanceRow}>
                    <MapPin size={12} color="#9CA3AF" />
                    <Text style={styles.userDistance}>{user.distance}</Text>
                  </View>
                  <View style={styles.interestsContainer}>
                    {user.interests.slice(0, 2).map((interest) => (
                      <View key={interest} style={styles.interestTag}>
                        <Text style={styles.interestText}>{interest}</Text>
                      </View>
                    ))}
                  </View>
                  <View style={styles.actionButtons}>
                    <Pressable style={styles.likeButton} onPress={() => handleLike(user.id, user.name)}>
                      <Heart size={14} color="#ff3f41" fill={likedUsers.has(user.id) ? '#ff3f41' : 'none'} />
                      <Text style={styles.buttonText}>{likedUsers.has(user.id) ? 'Liked' : 'Like'}</Text>
                    </Pressable>
                    <Pressable style={[styles.connectButton, requestedUsers.has(user.id) && styles.requestedButton]} onPress={() => handleConnect(user.id, user.name)}>
                      <MessageCircle size={14} color="#fff" />
                      <Text style={styles.connectButtonText}>{requestedUsers.has(user.id) ? 'Requested' : 'Connect'}</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <Modal visible={showCancelModal} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cancel Request</Text>
            <Text style={styles.modalMessage}>
              Do you want to cancel the connection request to {userToCancel?.name}?
            </Text>
            <View style={styles.modalButtons}>
              <Pressable style={styles.modalCancelButton} onPress={() => setShowCancelModal(false)}>
                <Text style={styles.modalCancelText}>No</Text>
              </Pressable>
              <Pressable style={styles.modalConfirmButton} onPress={handleCancelRequest}>
                <Text style={styles.modalConfirmText}>Yes</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 46,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#2E2E2E',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E5E7EB',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  connectModeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  connectModeLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#E5E7EB',
  },
  customToggleContainer: {
    padding: 2,
    borderWidth: 2,
    borderColor: '#ff3f41',
    borderRadius: 18,
  },
  customToggle: {
    width: 48,
    height: 28,
    borderRadius: 16,
    padding: 2,
    position: 'relative',
  },
  customToggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    elevation: 2,
  },
  discoveryBannerWrapper: {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: 8,
  },
  discoveryBannerWrapperAbsolute: {
    position: 'absolute',
    top: 100,
    right: 20,
    zIndex: 1000,
    elevation: 1000,
  },
  discoveryBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#ff3f41',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  discoveryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    opacity: 0.9,
  },
  discoveryText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  discoveryPointer: {
    position: 'absolute',
    right: 18,
    top: -4,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#ff3f41',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  viewToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  toggleButtonActive: {
    backgroundColor: '#ff3f41',
    borderColor: '#ff3f41',
  },
  toggleButtonActiveMap: {
    backgroundColor: '#7856d4',
    borderColor: '#7856d4',
  },
  toggleButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  toggleButtonTextActive: {
    color: '#fff',
  },
  mapContainer: {
    minHeight: 400,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  mapPlaceholder: {
    flex: 1,
    minHeight: 400,
    backgroundColor: '#0F0F10',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2E2E2E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPlaceholderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#E5E7EB',
    marginBottom: 8,
  },
  mapPlaceholderSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#0F0F10',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2E2E2E',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#E5E7EB',
  },
  searchBarContainer: {
    position: 'relative',
    marginBottom: 16,
    zIndex: 1000,
  },
  suggestionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#0F0F10',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2E2E2E',
    marginTop: 8,
    maxHeight: 200,
    overflow: 'hidden',
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2E2E2E',
  },
  suggestionText: {
    fontSize: 14,
    color: '#E5E7EB',
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 16,
    backgroundColor: '#1F0A0A',
    borderRadius: 12,
    marginBottom: 16,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ff3f41',
  },
  enableCard: {
    padding: 24,
    backgroundColor: '#745ec9',
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  enableIcon: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  enableText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  enableButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  enableButtonText: {
    color: '#745ec9',
    fontWeight: '600',
  },
  usersContainer: {
    gap: 12,
  },
  userCard: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#0D0D0D',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2E2E2E',
    gap: 16,
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E5E7EB',
    marginBottom: 4,
  },
  distanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  userDistance: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  interestsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  interestTag: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#3D0A0A',
    borderRadius: 20,
  },
  interestText: {
    fontSize: 13,
    color: '#ff3f41',
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  likeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#2E2E2E',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 12,
    color: '#ff3f41',
  },
  connectButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 8,
    backgroundColor: '#ff3f41',
    borderRadius: 8,
  },
  connectButtonText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  toastContainer: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 2000,
    elevation: 2000,
  },
  requestedButton: {
    backgroundColor: '#2E2E2E',
  },
  toast: {
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2E2E2E',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    maxWidth: 320,
  },
  toastTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  toastMessage: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '400',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#0F0F10',
    borderRadius: 20,
    padding: 24,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E5E7EB',
    marginBottom: 16,
  },
  modalMessage: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 24,
    lineHeight: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalCancelButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2E2E2E',
    alignItems: 'center',
  },
  modalCancelText: {
    color: '#E5E7EB',
    fontSize: 14,
    fontWeight: '600',
  },
  modalConfirmButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#ff3f41',
    alignItems: 'center',
  },
  modalConfirmText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default NearbyScreen;
