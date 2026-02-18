import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, Linking } from 'react-native';
import { ChevronLeft, Phone, Mail, MessageCircle, HelpCircle } from 'lucide-react-native';

const SupportScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={28} color="#0D224C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Customer Support</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.hero}>
           <HelpCircle size={64} color="#0D224C" />
           <Text style={styles.heroTitle}>How can we help?</Text>
           <Text style={styles.heroSub}>Our team is available Mon-Fri, 9AM - 5PM</Text>
        </View>

        <View style={styles.options}>
          <TouchableOpacity 
            style={styles.card}
            onPress={() => Linking.openURL('tel:0800FIRSTSEC')}
          >
            <View style={[styles.iconBox, { backgroundColor: '#EFF6FF' }]}>
               <Phone size={24} color="#3B82F6" />
            </View>
            <View>
              <Text style={styles.cardLabel}>Call Center</Text>
              <Text style={styles.cardValue}>0800-FIRST-SEC</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.card}
            onPress={() => Linking.openURL('mailto:support@firstsecurities.com')}
          >
            <View style={[styles.iconBox, { backgroundColor: '#F0FDF4' }]}>
               <Mail size={24} color="#22C55E" />
            </View>
            <View>
              <Text style={styles.cardLabel}>Email Support</Text>
              <Text style={styles.cardValue}>support@firstsecurities.com</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.card}
            onPress={() => alert('WhatsApp Chat initialization...')}
          >
            <View style={[styles.iconBox, { backgroundColor: '#FDF2F8' }]}>
               <MessageCircle size={24} color="#DB2777" />
            </View>
            <View>
              <Text style={styles.cardLabel}>Live Chat</Text>
              <Text style={styles.cardValue}>WhatsApp Support</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>Frequently Asked</Text>
          <View style={styles.faqList}>
             {['How do I fund my account?', 'Trading hours & Holidays', 'KYC Document status', 'Transfer limits'].map((q, i) => (
               <TouchableOpacity key={i} style={styles.faqItem}>
                 <Text style={styles.faqText}>{q}</Text>
                 <ChevronLeft size={16} color="#999" style={{ transform: [{ rotate: '180deg'}] }} />
               </TouchableOpacity>
             ))}
          </View>
        </View>
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
  scrollContent: {
    padding: 24,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 40,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
  },
  heroSub: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  options: {
    marginBottom: 40,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#999',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  cardValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  faqSection: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  faqList: {
    backgroundColor: '#fff',
  },
  faqItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  faqText: {
    fontSize: 15,
    color: '#444',
  },
});

export default SupportScreen;
