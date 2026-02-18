import React from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image 
          source={{ uri: 'https://first-securities.com/wp-content/uploads/2025/02/cropped-favicon-192x192.png' }} 
          style={styles.logo}
        />
      </View>
      <Text style={styles.title}>First Securities</Text>
      <Text style={styles.subtitle}>Brokers Limited</Text>
      
      <View style={styles.footer}>
        <ActivityIndicator color="#0D224C" size="small" />
        <Text style={styles.loadingText}>Initializing Trading Terminal...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0D224C',
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    fontWeight: '600',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  footer: {
    position: 'absolute',
    bottom: 60,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
});

export default SplashScreen;