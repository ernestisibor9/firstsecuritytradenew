import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Switch, Alert } from 'react-native';
import { ChevronLeft, Bell, Shield, Moon, Eye, Globe, Info } from 'lucide-react-native';

const SettingsScreen = ({ navigation }: any) => {
  const [notifications, setNotifications] = useState(true);
  const [biometrics, setBiometrics] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [hideBalances, setHideBalances] = useState(false);

  const renderSettingItem = (icon: any, label: string, type: 'toggle' | 'link', value?: any, onValueChange?: any, onPress?: any) => (
    <TouchableOpacity 
      style={styles.settingItem} 
      onPress={type === 'link' ? onPress : undefined}
      activeOpacity={type === 'link' ? 0.7 : 1}
    >
      <View style={styles.settingLeft}>
        <View style={styles.iconBox}>
          {icon}
        </View>
        <Text style={styles.settingLabel}>{label}</Text>
      </View>
      {type === 'toggle' ? (
        <Switch 
          value={value} 
          onValueChange={onValueChange}
          trackColor={{ false: '#E5E7EB', true: '#0D224C' }}
        />
      ) : (
        <ChevronLeft size={20} color="#999" style={{ transform: [{ rotate: '180deg' }] }} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={28} color="#0D224C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>General</Text>
        <View style={styles.section}>
          {renderSettingItem(<Bell size={20} color="#3B82F6" />, "Push Notifications", "toggle", notifications, setNotifications)}
          {renderSettingItem(<Moon size={20} color="#8B5CF6" />, "Dark Mode", "toggle", darkMode, setDarkMode)}
          {renderSettingItem(<Globe size={20} color="#10B981" />, "Language", "link", null, null, () => Alert.alert("Language", "Coming soon"))}
        </View>

        <Text style={styles.sectionTitle}>Privacy & Security</Text>
        <View style={styles.section}>
          {renderSettingItem(<Shield size={20} color="#F59E0B" />, "Biometric Login", "toggle", biometrics, setBiometrics)}
          {renderSettingItem(<Eye size={20} color="#6366F1" />, "Hide Portfolio Balances", "toggle", hideBalances, setHideBalances)}
          {renderSettingItem(<Info size={20} color="#EF4444" />, "Privacy Policy", "link", null, null, () => Alert.alert("Privacy", "Link to privacy policy"))}
        </View>

        <Text style={styles.sectionTitle}>App Info</Text>
        <View style={styles.section}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Build Version</Text>
            <Text style={styles.infoValue}>2.0.1 (54)</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Last Updated</Text>
            <Text style={styles.infoValue}>Oct 2025</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.resetBtn}
          onPress={() => Alert.alert("Debug", "Cache cleared successfully.")}
        >
          <Text style={styles.resetBtnText}>Clear Cache & Reset Onboarding</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0D224C',
  },
  scrollContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
    marginTop: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#eee',
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f9f9f9',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f9f9f9',
  },
  infoLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  resetBtn: {
    marginTop: 40,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
  },
  resetBtnText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
