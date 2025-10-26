import React, { useEffect } from "react";
import { View, Text, Pressable, SafeAreaView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Heart, Users, Calendar } from "lucide-react-native";

const IndexScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Auto-redirect to main tabs after 2 seconds
    const timer = setTimeout(() => {
      navigation.navigate('Main' as never);
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Heart color="white" size={40} />
            </View>
            <Text style={styles.title}>Icebreaker</Text>
            <Text style={styles.subtitle}>Connect with amazing people around you</Text>
          </View>

          <View style={styles.features}>
            <View style={styles.feature}>
              <Users color="#2563eb" size={20} />
              <Text style={styles.featureText}>Meet nearby people instantly</Text>
            </View>
            <View style={styles.feature}>
              <Calendar color="#2563eb" size={20} />
              <Text style={styles.featureText}>Schedule meetups in advance</Text>
            </View>
            <View style={styles.feature}>
              <Heart color="#2563eb" size={20} />
              <Text style={styles.featureText}>Build meaningful connections</Text>
            </View>
          </View>

          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('Main' as never)}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </Pressable>
          
          <Text style={styles.redirectText}>
            Redirecting you to the app...
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9ff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    padding: 32,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#2563eb',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: '#6b7280',
    textAlign: 'center',
  },
  features: {
    marginBottom: 24,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 12,
  },
  button: {
    width: '100%',
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  redirectText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
});

export default IndexScreen;