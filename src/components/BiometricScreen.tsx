import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Fingerprint, ChevronLeft } from 'lucide-react-native';

const BiometricScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={28} color="#0D224C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Biometric Login</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Fingerprint size={80} color="#0D224C" />
        </View>
        <Text style={styles.title}>Secure Access</Text>
        <Text style={styles.description}>
          Enable FaceID or TouchID to quickly and securely access your trading account without entering your password every time.
        </Text>

        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => {
            alert('Biometrics successfully linked!');
            navigation.goBack();
          }}
        >
          <Text style={styles.buttonText}>Enable Biometrics</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.textButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.textButtonLabel}>Maybe Later</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0D224C',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  iconCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0D224C',
    marginBottom: 12,
  },
  description: {
    textAlign: 'center',
    color: '#666',
    lineHeight: 22,
    marginBottom: 48,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: '#0D224C',
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textButton: {
    padding: 12,
  },
  textButtonLabel: {
    color: '#999',
    fontWeight: '600',
  },
});

export default BiometricScreen;
