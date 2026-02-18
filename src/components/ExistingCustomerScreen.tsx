import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar, Platform, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { ChevronLeft, UserCheck } from 'lucide-react-native';

const ExistingCustomerScreen = ({ navigation }: any) => {
  const [formData, setFormData] = useState({
    customerId: '',
    email: '',
    phone: ''
  });

  const handleVerify = () => {
    if (!formData.customerId || !formData.email) {
      Alert.alert('Error', 'Please provide your customer ID and registered email.');
      return;
    }
    Alert.alert(
      'Verification Sent',
      'We have sent a secure link to your registered email address. Please click the link to activate your online access.',
      [{ text: 'OK', onPress: () => navigation.navigate('Welcome') }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={28} color="#0D224C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Linkage</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.hero}>
          <UserCheck size={64} color="#0D224C" />
          <Text style={styles.heroTitle}>Existing Client</Text>
          <Text style={styles.heroSub}>Activate your online trading access</Text>
        </View>

        <View style={styles.form}>
           <View style={styles.inputGroup}>
             <Text style={styles.label}>Customer ID</Text>
             <TextInput 
               style={styles.input}
               placeholder="Enter your customer ID"
               value={formData.customerId}
               onChangeText={(text) => setFormData({...formData, customerId: text})}
             />
           </View>

           <View style={styles.inputGroup}>
             <Text style={styles.label}>Registered Email</Text>
             <TextInput 
               style={styles.input}
               placeholder="your@email.com"
               keyboardType="email-address"
               autoCapitalize="none"
               value={formData.email}
               onChangeText={(text) => setFormData({...formData, email: text})}
             />
           </View>

           <View style={styles.inputGroup}>
             <Text style={styles.label}>Phone Number</Text>
             <TextInput 
               style={styles.input}
               placeholder="080XXXXXXXX"
               keyboardType="phone-pad"
               value={formData.phone}
               onChangeText={(text) => setFormData({...formData, phone: text})}
             />
           </View>

           <Text style={styles.note}>
             Note: Your details must match the information provided during your physical account opening.
           </Text>

           <TouchableOpacity style={styles.primaryButton} onPress={handleVerify}>
             <Text style={styles.buttonText}>Verify & Send Link</Text>
           </TouchableOpacity>
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
  heroSub: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  form: {
    marginTop: 10,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#999',
    textTransform: 'uppercase',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
  },
  note: {
    fontSize: 12,
    color: '#999',
    lineHeight: 18,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 32,
  },
  primaryButton: {
    backgroundColor: '#0D224C',
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ExistingCustomerScreen;
