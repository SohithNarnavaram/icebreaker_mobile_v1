import React, { useEffect } from "react";
import { View, Text, SafeAreaView, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Heart, Users, Calendar } from "lucide-react-native";

const IndexScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Main' as never);
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Heart color="white" size={40} />
          </View>
          <Text style={styles.title}>Icebreaker</Text>
          <Text style={styles.subtitle}>Connect with amazing people around you</Text>

          <View style={styles.features}>
            <View style={styles.feature}>
              <Users color="#ff3f41" size={20} />
              <Text style={styles.featureText}>Meet nearby people instantly</Text>
            </View>
            <View style={styles.feature}>
              <Calendar color="#ff3f41" size={20} />
              <Text style={styles.featureText}>Schedule meetups in advance</Text>
            </View>
            <View style={styles.feature}>
              <Heart color="#ff3f41" size={20} />
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
  container: { flex: 1, backgroundColor: '#000000' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  card: { width: '100%', maxWidth: 400, padding: 32, backgroundColor: '#0D0D0D', borderRadius: 8, borderWidth: 1, borderColor: '#2E2E2E' },
  iconContainer: { width: 80, height: 80, backgroundColor: '#ff3f41', borderRadius: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 16, alignSelf: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#E5E7EB', marginBottom: 8, textAlign: 'center' },
  subtitle: { color: '#9CA3AF', textAlign: 'center', marginBottom: 24 },
  features: { marginBottom: 24, gap: 16 },
  feature: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  featureText: { fontSize: 14, color: '#9CA3AF', flex: 1 },
  button: { width: '100%', backgroundColor: '#ff3f41', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, marginBottom: 12 },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: '600' },
  redirectText: { fontSize: 12, color: '#6B7280', textAlign: 'center' },
});

export default IndexScreen;
