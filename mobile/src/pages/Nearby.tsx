import React from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { MapPin, Users } from "lucide-react-native";

const NearbyScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Nearby</Text>
          <Text style={styles.subtitle}>Find people around you</Text>
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={styles.locationCard}>
            <View style={styles.locationHeader}>
              <MapPin color="#2563eb" size={20} />
              <Text style={styles.locationTitle}>Your Location</Text>
            </View>
            <Text style={styles.locationText}>Searching for people nearby...</Text>
          </View>

          <View style={styles.peopleList}>
            <View style={styles.personCard}>
              <View style={styles.personInfo}>
                <View style={[styles.avatar, { backgroundColor: '#10b981' }]} />
                <View style={styles.personDetails}>
                  <Text style={styles.personName}>Sarah Chen</Text>
                  <Text style={styles.personDistance}>0.2 miles away</Text>
                </View>
                <Users color="#2563eb" size={20} />
              </View>
            </View>

            <View style={styles.personCard}>
              <View style={styles.personInfo}>
                <View style={[styles.avatar, { backgroundColor: '#8b5cf6' }]} />
                <View style={styles.personDetails}>
                  <Text style={styles.personName}>Alex Kumar</Text>
                  <Text style={styles.personDistance}>0.5 miles away</Text>
                </View>
                <Users color="#2563eb" size={20} />
              </View>
            </View>

            <View style={styles.personCard}>
              <View style={styles.personInfo}>
                <View style={[styles.avatar, { backgroundColor: '#f59e0b' }]} />
                <View style={styles.personDetails}>
                  <Text style={styles.personName}>Priya Singh</Text>
                  <Text style={styles.personDistance}>0.8 miles away</Text>
                </View>
                <Users color="#2563eb" size={20} />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    color: '#6b7280',
  },
  scrollView: {
    flex: 1,
  },
  locationCard: {
    backgroundColor: '#eff6ff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 8,
  },
  locationText: {
    color: '#6b7280',
  },
  peopleList: {
    gap: 12,
  },
  personCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  personInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  personDetails: {
    flex: 1,
  },
  personName: {
    fontWeight: '600',
    color: '#111827',
  },
  personDistance: {
    fontSize: 14,
    color: '#6b7280',
  },
});

export default NearbyScreen;