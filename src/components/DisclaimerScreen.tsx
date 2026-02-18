import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, Platform, StyleSheet, SafeAreaView } from 'react-native';
import { ChevronLeft, ShieldAlert, CheckCircle } from 'lucide-react-native';

const DisclaimerScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={28} color="#0D224C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Risk Disclosure</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.hero}>
          <ShieldAlert size={64} color="#0D224C" />
          <Text style={styles.heroTitle}>Important Information</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Trading Risk</Text>
          <Text style={styles.text}>
            Trading in securities involves a substantial risk of loss and is not suitable for everyone. You should carefully consider your financial condition and risk tolerance before trading.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Partial or Total Loss</Text>
          <Text style={styles.text}>
            You may lose some or all of your initial investment. Only invest money you can afford to lose.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Past Performance</Text>
          <Text style={styles.text}>
            Past performance is not indicative of future results. Any financial projections are merely estimates and not a guarantee of future gains.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Regulatory Oversight</Text>
          <Text style={styles.text}>
            First Securities Brokers Ltd is regulated by the Securities and Exchange Commission (SEC) Nigeria. However, regulation does not eliminate the inherent risks of market participation.
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>I Understand & Accept</Text>
        </TouchableOpacity>
        
        <Text style={styles.footerText}>
          Last updated: October 2025
        </Text>
      </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 15,
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0D224C',
  },
  scrollContent: {
    padding: 24,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 32,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0D224C',
    marginTop: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  primaryButton: {
    backgroundColor: '#0D224C',
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#999',
    marginBottom: 40,
  },
});

export default DisclaimerScreen;
