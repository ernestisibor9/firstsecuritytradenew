import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { ChevronLeft, UserX, Mail, Phone } from 'lucide-react-native';

const ForgotCustomerIdScreen = ({ navigation }: any) => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
  });

  const handleRecoverID = () => {
    if (!formData.email && !formData.phone) {
      Alert.alert('Error', 'Please provide either your registered email or phone number.');
      return;
    }
    Alert.alert(
      'Customer ID Sent',
      'We have sent your Customer ID to your registered email address and phone number. Please check your inbox and messages.',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={28} color="#0D224C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Forgot Customer ID</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.hero}>
          <View style={styles.iconCircle}>
            <UserX size={48} color="#0D224C" />
          </View>
          <Text style={styles.heroTitle}>Recover Your Customer ID</Text>
          <Text style={styles.heroSub}>
            Enter your registered email or phone number and we'll send you your Customer ID.
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Registered Email</Text>
            <View style={styles.inputContainer}>
              <Mail size={20} color="#999" style={styles.inputIcon} />
              <TextInput 
                style={styles.input}
                placeholder="your@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={(text) => setFormData({...formData, email: text})}
              />
            </View>
          </View>

          <View style={styles.orDivider}>
            <View style={styles.dividerLine} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Registered Phone Number</Text>
            <View style={styles.inputContainer}>
              <Phone size={20} color="#999" style={styles.inputIcon} />
              <TextInput 
                style={styles.input}
                placeholder="080XXXXXXXX"
                keyboardType="phone-pad"
                value={formData.phone}
                onChangeText={(text) => setFormData({...formData, phone: text})}
              />
            </View>
          </View>

          <Text style={styles.note}>
            Your Customer ID will be sent to both your registered email and phone number for security purposes.
          </Text>

          <TouchableOpacity style={styles.primaryButton} onPress={handleRecoverID}>
            <Text style={styles.buttonText}>Recover Customer ID</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.secondaryButtonText}>Back to Login</Text>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
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
    marginBottom: 40,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0D224C',
    marginBottom: 8,
  },
  heroSub: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F9FAFB',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  orDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  orText: {
    marginHorizontal: 16,
    fontSize: 12,
    color: '#999',
    fontWeight: 'bold',
  },
  note: {
    fontSize: 12,
    color: '#999',
    lineHeight: 18,
    textAlign: 'center',
    marginHorizontal: 10,
    marginBottom: 32,
  },
  primaryButton: {
    backgroundColor: '#0D224C',
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#0D224C',
  },
  secondaryButtonText: {
    color: '#0D224C',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ForgotCustomerIdScreen;
