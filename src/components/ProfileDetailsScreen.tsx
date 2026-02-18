import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Alert, StatusBar, Platform } from 'react-native';
import { ChevronLeft, User, Mail, Phone, MapPin, Building2, CreditCard, Shield, CheckCircle } from 'lucide-react-native';

const ProfileDetailsScreen = ({ navigation }: any) => {
  
  const showEditAlert = () => {
    Alert.alert(
      'Update Required',
      'To update personal details, an OTP verification will be required. This feature is coming soon.',
      [{ text: 'OK' }]
    );
  };

  const showBankChangeAlert = () => {
    Alert.alert(
      'Request Submitted',
      'Request for change of bank details has been submitted. Our team will contact you within 7 working days.',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={28} color="#0D224C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Hero - SYNCED WITH HTML */}
        <View style={styles.profileHero}>
          <View style={styles.avatarCircle}>
            <User size={48} color="#0D224C" />
          </View>
          <Text style={styles.profileName}>Fiona Ahimie</Text>
          <Text style={styles.customerId}>Customer ID: CUST001</Text>
        </View>

        {/* Personal Information - SYNCED WITH HTML */}
        <View style={styles.section}>
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            <View style={styles.infoGrid}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Full Name:</Text>
                <Text style={styles.infoValue}>Fiona Ahimie</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Customer ID:</Text>
                <Text style={styles.infoValue}>CUST001</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>CSCS Number:</Text>
                <Text style={styles.infoValue}>CSCS12345678</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Broker ID:</Text>
                <Text style={styles.infoValue}>BROKER001</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Email:</Text>
                <View style={styles.editableRow}>
                  <Text style={styles.infoValue}>john@example.com</Text>
                  <TouchableOpacity onPress={showEditAlert}>
                    <Text style={styles.editBtn}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Phone Number:</Text>
                <View style={styles.editableRow}>
                  <Text style={styles.infoValue}>+234 8034265103</Text>
                  <TouchableOpacity onPress={showEditAlert}>
                    <Text style={styles.editBtn}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Account Information - SYNCED WITH HTML */}
        <View style={styles.section}>
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Account Information</Text>
            <View style={styles.infoGrid}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Account Type:</Text>
                <Text style={styles.infoValue}>Individual Trading Account</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Account Status:</Text>
                <Text style={[styles.infoValue, { color: '#22C55E' }]}>Active</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>KYC Status:</Text>
                <View style={styles.verifiedRow}>
                  <CheckCircle size={16} color="#22C55E" />
                  <Text style={[styles.infoValue, { color: '#22C55E', marginLeft: 4 }]}>Verified</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Bank Details - SYNCED WITH HTML */}
        <View style={styles.section}>
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Bank Details</Text>
            <View style={styles.infoGrid}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Bank Name:</Text>
                <Text style={styles.infoValue}>First Bank</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Account Number:</Text>
                <Text style={styles.infoValue}>1234567890</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Account Name:</Text>
                <Text style={styles.infoValue}>Fiona Ahimie</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Linked Date:</Text>
                <Text style={styles.infoValue}>15/03/2025</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Address Information - SYNCED WITH HTML */}
        <View style={styles.section}>
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Address</Text>
            <View style={styles.infoGrid}>
              <View style={styles.infoRowVertical}>
                <Text style={styles.infoLabel}>Residential Address:</Text>
                <Text style={[styles.infoValue, { marginTop: 4 }]}>
                  123 Investment Street, Victoria Island, Lagos
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>State:</Text>
                <Text style={styles.infoValue}>Lagos</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Country:</Text>
                <Text style={styles.infoValue}>Nigeria</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Change Bank Details Button - SYNCED WITH HTML */}
        <TouchableOpacity style={styles.primaryBtn} onPress={showBankChangeAlert}>
          <Text style={styles.primaryBtnText}>Request Change of Bank Details</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // header: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   paddingHorizontal: 16,
  //   paddingVertical: 12,
  //   borderBottomWidth: 1,
  //   borderBottomColor: '#f3f4f6',
  // },
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0D224C',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  profileHero: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: '#fff',
  },
  avatarCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0D224C',
  },
  customerId: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0D224C',
    marginBottom: 16,
  },
  infoGrid: {
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoRowVertical: {
    gap: 4,
  },
  infoLabel: {
    fontSize: 14,
    color: '#4b5563',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  editableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  editBtn: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '600',
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryBtn: {
    backgroundColor: '#0D224C',
    marginHorizontal: 20,
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileDetailsScreen;
